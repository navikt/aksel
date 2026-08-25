import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/app/_sanity/live";
import {
  PRINSIPPER_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";

type Props = {
  params: Promise<{ prinsipp: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ prinsipp }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: seoData } = await sanityFetchMetadata({
    query: PRINSIPPER_BY_SLUG_QUERY,
    params: { slug: `prinsipper/${prinsipp.join("/")}` },
    perspective,
  });

  return {
    title: seoData?.heading,
    description: seoData?.seo?.meta,
    openGraph: {
      images: urlForOpenGraphImage(seoData?.seo?.image),
    },
  };
}

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({
    query: SLUG_BY_TYPE_QUERY,
    params: { type: "aksel_prinsipp" },
  });

  return data
    .filter((slug): slug is NonNullable<typeof slug> => Boolean(slug))
    .map((slug) => ({
      prinsipp: slug.replace("prinsipper/", "").split("/"),
    }));
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

  const { prinsipp } = await params;
  return (
    <CachedPage prinsipp={prinsipp} perspective="published" stega={false} />
  );
}

async function DynamicPage({ params }: Props) {
  const [{ prinsipp }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return (
    <CachedPage prinsipp={prinsipp} perspective={perspective} stega={stega} />
  );
}

async function CachedPage({
  prinsipp,
  perspective,
  stega,
}: { prinsipp: string[] } & DynamicFetchOptions) {
  "use cache";

  const { data: pageData } = await sanityFetch({
    query: PRINSIPPER_BY_SLUG_QUERY,
    params: { slug: `prinsipper/${prinsipp.join("/")}` },
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
      {pageData?.ingress && (
        <BodyLong size="large" spacing>
          {pageData?.ingress}
        </BodyLong>
      )}
      <CustomPortableText
        value={(pageData.content ?? []) as PortableTextBlock[]}
      />
    </div>
  );
}
