import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { SIDE_ARTICLE_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { getImage } from "@/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: pageData } = await sanityFetch({
    query: SIDE_ARTICLE_BY_SLUG_QUERY,
    params: { slug: `side/${slug}` },
  });

  return {
    title: pageData?.heading,
    openGraph: {
      images: getImage(pageData?.heading ?? "", "thumbnail"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { data: pageData } = await sanityFetch({
    query: SIDE_ARTICLE_BY_SLUG_QUERY,
    params: { slug: `side/${slug}` },
  });

  if (!pageData || !pageData.content || !pageData.heading) {
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
