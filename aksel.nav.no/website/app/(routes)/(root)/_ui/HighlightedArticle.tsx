import cl from "clsx";
import NextImage from "next/image";
import NextLink from "next/link";
import { Image } from "sanity";
import {
  BodyLong,
  BodyShort,
  HGrid,
  HStack,
  Heading,
  Link,
} from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import {
  ArticleT,
  isArticle,
  isBlogg,
  isKomponent,
} from "./FrontpageMasonryCard";
import { BetaTag, Tag } from "./FrontpageTag";
import styles from "./frontpage.module.css";

export const Highlight = ({
  article,
  compact: singleHighlightedArticle,
}: {
  article: ArticleT;
  compact: boolean;
}) => {
  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  const useStatusImage =
    isKomponent(article) && (article.status?.bilde as Image);

  const date = useFormatedDate(article?.publishedAt ?? article._createdAt);

  const imageUrl = urlForImage(
    isKomponent(article) ? (article.status?.bilde as Image) : null,
  )
    ?.quality(100)
    .auto("format")
    .url();

  const imageBlurUrl = urlForImage(
    isKomponent(article) ? (article.status?.bilde as Image) : null,
  )
    ?.width(24)
    .height(24)
    .blur(10)
    .url();

  const seoImageUrl = urlForImage(article?.seo?.image as Image)
    ?.quality(100)
    .auto("format")
    .url();

  const seoImageBlurUrl = urlForImage(article?.seo?.image as Image)
    ?.width(24)
    .height(24)
    .blur(10)
    .url();

  const getStatusTag = () => {
    if (isArticle(article) || isBlogg(article)) {
      return "";
    }
    return article.status?.tag;
  };

  const authors =
    article.contributors?.map((author) => author.title).filter(Boolean) ?? [];

  return (
    <HGrid
      as="section"
      aria-label={`Fremhevet artikkel: ${article?.heading}`}
      align="start"
      className={styles.highlight}
      gap={singleHighlightedArticle ? "space-32" : "space-24"}
    >
      <div className={styles.sectionImageWrapper}>
        {useStatusImage && imageUrl ? (
          <NextImage
            src={imageUrl}
            blurDataURL={imageBlurUrl}
            placeholder="blur"
            quality={100}
            layout="fill"
            aria-hidden
            className={cl(`${styles.sectionImage}`, {
              [`${styles.betaHue}`]: article?.status?.tag === "beta",
            })}
            decoding="auto"
            alt={`thumbnail for ${article.heading}`}
          />
        ) : seoImageUrl ? (
          <NextImage
            src={seoImageUrl}
            blurDataURL={seoImageBlurUrl}
            placeholder="blur"
            quality={100}
            layout="fill"
            objectFit="cover"
            aria-hidden
            className={cl(`${styles.sectionImage}`, {
              [`${styles.betaHue}`]: getStatusTag() === "beta",
            })}
            decoding="auto"
            alt={`thumbnail for ${article.heading}`}
          />
        ) : (
          <NextImage
            src={fallbackImageUrl(article?.heading ?? "", "thumbnail")}
            layout="fill"
            objectFit="contain"
            aria-hidden
            className={styles.sectionImage}
            decoding="auto"
            alt={`thumbnail for ${article.heading}`}
          />
        )}
      </div>
      <div>
        <HStack gap="space-8">
          <Tag
            type={article._type}
            text={
              isArticle(article) ? article?.tema?.[0] ?? undefined : undefined
            }
          />
          {getStatusTag() === "beta" && <BetaTag />}
        </HStack>
        <Heading size="large" level="3">
          <Link
            as={NextLink}
            onClick={() =>
              umamiTrack("navigere", {
                kilde: "global sok",
                url: `/${article.slug}`,
              })
            }
            href={`/${article.slug}`}
            className={styles.highlightLink}
          >
            {article?.heading}
          </Link>
        </Heading>
        <BodyLong className="mb-4" size="medium">
          {isArticle(article) ||
            (isBlogg(article) && (article?.ingress ?? article.seo?.meta))}
        </BodyLong>
        {showFooter && authors.length > 0 && (
          <BodyShort size="small" className={styles.highlightAuthor}>
            <span className="font-semibold">{authors[0]}</span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
    </HGrid>
  );
};
