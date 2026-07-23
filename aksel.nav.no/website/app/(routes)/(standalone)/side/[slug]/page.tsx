import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/app/_sanity/live";
import {
  SIDE_ARTICLE_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({
    query: SLUG_BY_TYPE_QUERY,
    params: { type: "aksel_standalone" },
  });

  return data
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((slug) => ({ slug: slug.replace("side/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: pageData } = await sanityFetchMetadata({
    query: SIDE_ARTICLE_BY_SLUG_QUERY,
    params: { slug: `side/${slug}` },
    perspective,
  });

  return {
    title: pageData?.heading,
    openGraph: {
      images: fallbackImageUrl(pageData?.heading ?? "", "thumbnail"),
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

  const { data: pageData } = await sanityFetch({
    query: SIDE_ARTICLE_BY_SLUG_QUERY,
    params: { slug: `side/${slug}` },
    perspective,
    stega,
  });

  if (!pageData?.content || !pageData.heading) {
    notFound();
  }

  return (
    <div>
      <Heading level="1" size="xlarge" data-aksel-heading-color spacing>
        {pageData.heading}
      </Heading>
      <CustomPortableText
        value={(pageData.content ?? []) as PortableTextBlock[]}
      />
    </div>
  );
}
