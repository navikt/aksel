import cl from "clsx";
import NextImage from "next/image";
import NextLink from "next/link";
import { BodyLong, HGrid, HStack, Heading, Link } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
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
  const useStatusImage = isKomponent(article) && article.status?.bilde;

  const imageUrl = urlForImage(
    isKomponent(article) ? article.status?.bilde : null,
  )
    ?.quality(100)
    .auto("format")
    .url();

  const imageBlurUrl = urlForImage(
    isKomponent(article) ? article.status?.bilde : null,
  )
    ?.width(24)
    .height(24)
    .blur(10)
    .url();

  const seoImageUrl = urlForImage(article?.seo?.image)
    ?.quality(100)
    .auto("format")
    .url();

  const seoImageBlurUrl = urlForImage(article?.seo?.image)
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
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            aria-hidden
            className={cl(styles.sectionImage, {
              [`${styles.betaHue}`]:
                isKomponent(article) && article.status?.tag === "beta",
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
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            aria-hidden
            className={cl(styles.sectionImage, {
              [`${styles.betaHue}`]: getStatusTag() === "beta",
            })}
            decoding="auto"
            alt={`thumbnail for ${article.heading}`}
          />
        ) : (
          <NextImage
            src={fallbackImageUrl(article?.heading ?? "", "thumbnail")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
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
              isArticle(article) ? (article.tema?.[0] ?? undefined) : undefined
            }
          />
          {getStatusTag() === "beta" && <BetaTag />}
        </HStack>
        <Heading size="large" level="3">
          <Link
            as={NextLink}
            href={`/${article.slug}`}
            className={styles.highlightLink}
          >
            {article?.heading}
          </Link>
        </Heading>
        <BodyLong size="medium">
          {(isArticle(article) || isBlogg(article)) &&
            (article.ingress ?? article.seo?.meta)}
        </BodyLong>
      </div>
    </HGrid>
  );
};
