import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { BodyLong, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { PRINSIPPER_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";

type Props = {
  params: Promise<{ prinsipp: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { prinsipp } = await params;

  const { data: seoData } = await sanityFetch({
    query: PRINSIPPER_BY_SLUG_QUERY,
    params: { slug: `prinsipper/${prinsipp.join("/")}` },
    stega: false,
  });

  return {
    title: seoData?.heading,
    description: seoData?.seo?.meta,
    openGraph: {
      images: urlForOpenGraphImage(seoData?.seo?.image),
    },
  };
}

export default async function Page({ params }: Props) {
  const { prinsipp } = await params;

  const { data: pageData } = await sanityFetch({
    query: PRINSIPPER_BY_SLUG_QUERY,
    params: { slug: `prinsipper/${prinsipp.join("/")}` },
  });

  if (!pageData || !pageData.content || !pageData.heading) {
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
