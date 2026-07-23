import type { PortableTextBlock } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { Suspense } from "react";
import { Box } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/app/_sanity/live";
import {
  GP_CHANGELOGS_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { ChangelogForList } from "@/app/_ui/changelog-page/ChangelogForList";
import { ChangelogHeader } from "@/app/_ui/changelog-page/ChangelogHeader";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import styles from "../../artikler/[slug]/page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({
    query: SLUG_BY_TYPE_QUERY,
    params: { type: "gp_endringslogg_artikkel" },
  });

  return data
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((slug) => ({ slug: slug.replace("god-praksis/endring/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: pageData } = await sanityFetchMetadata({
    query: GP_CHANGELOGS_BY_SLUG_QUERY,
    params: { slug },
    perspective,
  });

  return {
    title: `${pageData?.heading} - Endringslogg`,
    keywords: "God praksis, endringslogg",
    openGraph: {
      type: "article",
      publishedTime: pageData?.endringsdato || undefined,
      images: "/images/og/endringslogg/OG-endringslogg.png",
    },
  };
}

export default async function Page({ params }: Props) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense fallback={null}>
        <DynamicPage params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return <CachedPage slug={slug} perspective="published" stega={false} />;
}

async function DynamicPage({ params }: Props) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return <CachedPage slug={slug} perspective={perspective} stega={stega} />;
}

async function CachedPage({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";

  const [{ data: pageData }, { data: toc }] = await Promise.all([
    sanityFetch({
      query: GP_CHANGELOGS_BY_SLUG_QUERY,
      params: { slug },
      perspective,
      stega,
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
      perspective,
      stega,
    }),
  ]);

  if (!pageData?.heading || !pageData._id || !pageData.endringsdato) {
    notFound();
  }

  const changelogFor =
    pageData.artikler?.filter(
      (article) => !!article.slug && !!article.heading,
    ) ?? [];

  return (
    <article className={styles.pageArticle}>
      <ChangelogHeader
        heading={pageData.heading}
        endringsdato={pageData.endringsdato}
        type="God praksis"
      >
        <ChangelogForList changelogFor={changelogFor} />
      </ChangelogHeader>

      <TableOfContents toc={toc || []} />
      <Box marginBlock="space-48">
        <CustomPortableText
          value={(pageData.content ?? []) as PortableTextBlock[]}
        />
      </Box>
    </article>
  );
}
