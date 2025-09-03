import { Metadata, ResolvingMetadata } from "next";
import { PortableTextBlock } from "next-sanity";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { BodyLong, BodyShort, HStack, Heading, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  BLOGG_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { urlForImage, urlForOpenGraphImage } from "@/app/_sanity/utils";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { formatDateString } from "@/ui-utils/format-date";
import { Avatar } from "../../../../dev/_ui/avatar/Avatar";
import styles from "../_ui/Produktbloggen.module.css";
import { queryToAvatars } from "../_ui/utils";

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
  const pageOgImage = urlForOpenGraphImage(pageData?.seo?.image);

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
  const avatars = queryToAvatars(pageData?.writers ?? []);
  const publishDate = formatDateString(publishedAtRaw);

  const imageUrl = urlForImage(pageData?.seo?.image)
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
        <VStack align="center" className={styles.intro}>
          <Heading level="1" size="xlarge" className={styles.articleTitle}>
            {pageData.heading}
          </Heading>
          {pageData?.ingress && (
            <BodyLong className={styles.bodyLong1}>
              {pageData?.ingress}
            </BodyLong>
          )}
          <div className={`${styles.horizontalLine}`} />
          <div data-wrapper-prose>
            <BodyShort className={`${styles.publishDate}`} textColor="subtle">
              {publishDate}
            </BodyShort>
          </div>
          <div>
            <HStack gap="space-32" justify="center" marginBlock="space-16 0">
              {avatars.map((avatar) => {
                return (
                  <Avatar
                    key={avatar.name}
                    imageSrc={avatar.imageSrc}
                    name={avatar.name}
                    type={avatar.type}
                    showName
                  ></Avatar>
                );
              })}
            </HStack>
          </div>
        </VStack>
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
              src={fallbackImageUrl(pageData?.heading ?? "", "thumbnail")}
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

      <div className={styles.customBlockWrapper} data-page-layout="centered">
        <CustomPortableText
          data-wrapper-prose
          value={(pageData?.content ?? []) as PortableTextBlock[]}
        />
      </div>
    </>
  );
}
