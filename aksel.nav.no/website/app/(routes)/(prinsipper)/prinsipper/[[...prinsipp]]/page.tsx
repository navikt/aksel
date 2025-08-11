import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { BodyLong, BodyShort, HStack, Heading, VStack } from "@navikt/ds-react";
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

  const authors =
    pageData?.contributors
      ?.filter((auth) => !!auth.title)
      .map((auth) => auth.title ?? "") ?? [];

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
      <VStack gap="space-8" marginBlock="space-48">
        <BodyShort size="large" weight="semibold" data-aksel-heading-color>
          Kontakt
        </BodyShort>
        <HStack gap="space-4" asChild>
          <BodyShort textColor="subtle" as="div">
            {authors.map((x, y) => (
              <address key={x}>
                {x}
                {y !== authors.length - 1 && ", "}
              </address>
            ))}
          </BodyShort>
        </HStack>
      </VStack>
    </div>
  );
}
