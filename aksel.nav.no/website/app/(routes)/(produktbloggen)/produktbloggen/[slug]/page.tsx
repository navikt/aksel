import type { Metadata, ResolvingMetadata } from "next";
import type { PortableTextBlock } from "next-sanity";
import { draftMode } from "next/headers";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BodyLong, BodyShort, HStack, Heading, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/app/_sanity/live";
import {
  BLOGG_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
} from "@/app/_sanity/queries";
import { urlForImage, urlForOpenGraphImage } from "@/app/_sanity/utils";
import { Avatar } from "@/app/_ui/avatar/Avatar";
import { queryToAvatars } from "@/app/_ui/avatar/utils";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetchStaticParams({
    query: SLUG_BY_TYPE_QUERY,
    params: { type: "aksel_blogg" },
  });

  return data
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((slug) => ({
      slug: slug.replace("produktbloggen/", ""),
    }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: pageData } = await sanityFetchMetadata({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: `produktbloggen/${slug}` },
    perspective,
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

  const parsedSlug = `produktbloggen/${slug}`;

  const { data: pageData } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
    perspective,
    stega,
  });

  if (!pageData?._id) {
    notFound();
  }

  if (!pageData.content || !pageData.heading) {
    return null;
  }

  const publishedAtRaw = pageData?.publishedAt ?? "";
  const avatars = queryToAvatars(pageData?.writers ?? []);
  const publishDate = formatDateString(publishedAtRaw);

  const imageUrl = urlForImage(pageData?.seo?.image)?.quality(100).url();

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
            <HStack
              gap="space-32"
              justify="center"
              marginBlock="space-16 space-0"
            >
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
