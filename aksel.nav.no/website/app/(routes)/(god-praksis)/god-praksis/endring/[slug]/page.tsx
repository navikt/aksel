import type { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { Box } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GP_CHANGELOGS_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { ChangelogForList } from "@/app/_ui/changelog-page/ChangelogForList";
import { ChangelogHeader } from "@/app/_ui/changelog-page/ChangelogHeader";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import styles from "../../artikler/[slug]/page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: pageData } = await sanityFetch({
    query: GP_CHANGELOGS_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
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
  const { slug } = await params;

  const [{ data: pageData }, { data: toc }] = await Promise.all([
    sanityFetch({
      query: GP_CHANGELOGS_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
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
