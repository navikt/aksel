import { Metadata, ResolvingMetadata } from "next";
import { PortableTextBlock } from "next-sanity";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { Image } from "sanity";
import { BodyLong, BodyShort, Detail, HStack, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  BLOGG_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { urlForImage, urlForOpenGraphImage } from "@/app/_sanity/utils";
import { formatDateString } from "@/ui-utils/format-date";
import { abbrName } from "@/ui-utils/format-text";
import { getImage } from "@/utils";
import styles from "../_ui/Produktbloggen.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getStaticParamsSlugs() {
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

export const generateStaticParams = async () => {
  return await getStaticParamsSlugs();
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const { data: pageData } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: `produktbloggen/${slug}` },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(pageData?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: pageData?.heading,
    description: pageData?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
}

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = `produktbloggen/${slug}`;

  const { data: pageData } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
  });

  const publishedAtRaw = pageData?.publishedAt ?? "";
  const publishDate = formatDateString(publishedAtRaw);
  const authors = (pageData?.contributors as any)?.map((x) => x?.title) ?? [];

  const imageUrl = urlForImage(pageData?.seo?.image as Image)
    ?.quality(100)
    .url();

  if (!pageData?._id) {
    notFound();
  }

  if (!pageData.content || !pageData.heading) {
    return null;
  }

  return (
    <>
      <div className={styles.preamble}>
        <div className={styles.intro}>
          <Heading level="1" size="xlarge" className={styles.articleTitle}>
            {pageData.heading}
          </Heading>
          {pageData?.ingress && (
            <BodyLong className={styles.bodyLong1}>
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
              <Detail as="span">{publishDate}</Detail>
              {authors?.[0] && (
                <>
                  <span className={styles.diamond} />
                  <BodyShort size="small" as="address">
                    {authors?.[0]}
                  </BodyShort>
                </>
              )}
            </HStack>
          </div>
        </div>
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
      </div>

      <div className={styles.customBlockWrapper}>
        <CustomPortableText
          data-wrapper-prose
          value={(pageData?.content ?? []) as PortableTextBlock[]}
        />
      </div>

      <div className={styles.articleEnd}>
        <div data-wrapper-prose>
          <div className={`${styles.diamond} ${styles.diamondCenter}`} />
          {authors?.length > 0 && (
            <Detail uppercase className={styles.authorText} as="p">
              Bidragsytere
            </Detail>
          )}
          {authors?.length > 0 && (
            <BodyShort as="div" className={styles.author}>
              {authors.map(abbrName).map((x, y) => (
                <address key={x}>
                  {x}
                  {y !== authors.length - 1 && ", "}
                </address>
              ))}
            </BodyShort>
          )}
          <HStack justify="center">
            <BodyShort textColor="subtle">Publisert: {publishDate}</BodyShort>
          </HStack>
        </div>
      </div>
    </>
  );
}
