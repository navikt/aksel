import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { Image } from "sanity";
import {
  BodyLong,
  BodyShort,
  Box,
  Detail,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";

/* @ts-expect-error Fixed by updating moduleresolution in tsconfig */
import { PageBlock } from "@navikt/ds-react/Page";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  BLOGG_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { urlForImage, urlForOpenGraphImage } from "@/app/_sanity/utils";
import { abbrName, dateStr, getImage } from "@/utils";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: SLUG_BY_TYPE_QUERY,
    params: { type: "aksel_blogg" },
    stega: false,
    perspective: "published",
  });

  return data
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((slug) => {
      return {
        slug,
      };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: pageData } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: `produktbloggen/${slug}` },
    stega: false,
  });

  const pageOgImage =
    urlForOpenGraphImage(pageData?.seo?.image as Image) ??
    getImage(pageData?.heading ?? "", "thumbnail");

  return {
    title: pageData?.heading,
    description: pageData?.seo?.meta,
    openGraph: {
      images: pageOgImage,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = `produktbloggen/${slug}`;

  const { data: pageData } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
  });

  const publishDate = await dateStr(pageData?.publishedAt ?? "");

  const authors: string[] = [];

  for (const author of pageData?.contributors ?? []) {
    author?.title && authors.push(author.title);
  }

  const imageUrl = urlForImage(pageData?.seo?.image as Image)
    ?.quality(100)
    .url();

  if (!pageData?._id) {
    notFound();
  }

  if (!pageData.content || !pageData.heading) {
    return null;
  }

  const showAuthors = authors?.length > 0;

  return (
    <>
      <PageBlock width="md">
        <Heading
          level="1"
          size="xlarge"
          className={styles.articleTitle}
          data-aksel-heading-color
          align="center"
        >
          {pageData.heading}
        </Heading>
        {pageData?.ingress && (
          <BodyLong align="center" className={styles.articleIngress}>
            {pageData?.ingress}
          </BodyLong>
        )}
        <div>
          <HStack
            justify="center"
            align="center"
            gap="space-8"
            marginBlock="space-20 0"
          >
            <BodyShort size="small" as="span">
              {publishDate}
            </BodyShort>
            {showAuthors && (
              <>
                <span className={styles.articleDiamond} />
                <BodyShort size="small" as="address">
                  {authors?.[0]}
                </BodyShort>
              </>
            )}
          </HStack>
        </div>
      </PageBlock>
      <div className={styles.image}>
        {imageUrl ? (
          <NextImage
            src={imageUrl}
            blurDataURL={imageUrl}
            placeholder="blur"
            decoding="sync"
            fill={true}
            sizes="100%"
            aria-hidden
            priority
            alt=""
            quality={100}
          />
        ) : (
          <NextImage
            src={getImage(pageData?.heading ?? "", "thumbnail")}
            decoding="sync"
            fill={true}
            sizes="100%"
            aria-hidden
            priority
            alt=""
          />
        )}
      </div>

      <Box marginBlock="space-64" asChild>
        <PageBlock gutters width="md">
          <CustomPortableText
            value={(pageData?.content ?? []) as PortableTextBlock[]}
          />
        </PageBlock>
      </Box>

      <Box marginBlock="space-64 space-0" asChild>
        <PageBlock width="md">
          <Box marginInline="auto" asChild marginBlock="space-0 space-40">
            <div className={styles.articleDiamond} />
          </Box>
          <VStack gap="space-8">
            {showAuthors && (
              <>
                <Detail
                  uppercase
                  align="center"
                  as="p"
                  data-aksel-heading-color
                >
                  Bidragsytere
                </Detail>
                <HStack asChild justify="center" align="center" gap="space-4">
                  <BodyShort as="div">
                    {authors.map(abbrName).map((x, y) => (
                      <address key={x}>
                        {x}
                        {y !== authors.length - 1 && ", "}
                      </address>
                    ))}
                  </BodyShort>
                </HStack>
              </>
            )}

            <BodyShort textColor="subtle" align="center">
              Publisert: {publishDate}
            </BodyShort>
          </VStack>
        </PageBlock>
      </Box>
    </>
  );
}
