import cl from "clsx";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { BodyLong, BodyShort, HStack, Heading, Link } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { getAuthors, getImage } from "@/utils";
import { ArticleT } from "./Card";
import { BetaTag, Tag } from "./Tag";
import styles from "./landingpage.module.css";

export const Highlight = ({
  article,
  compact,
}: {
  article: ArticleT;
  compact: boolean;
}) => {
  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  const useStatusImage =
    ["ds_artikkel", "komponent_artikkel"].includes(article._type) &&
    article.status?.bilde;

  const date = useFormatedDate(article?.publishedAt ?? article._createdAt);

  const imageUrl = urlForImage(article.status?.bilde)
    ?.quality(100)
    .auto("format")
    .url();

  const imageBlurUrl = urlForImage(article.status?.bilde)
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

  return (
    <section
      aria-label={`Fremhevet artikkel: ${article?.heading}`}
      className={cl({
        [`${styles.highlightSectionCompact}`]: compact,
        [`${styles.highlightSection}`]: !compact,
      })}
    >
      <div className={styles.sectionImageWrapper}>
        {useStatusImage && imageUrl ? (
          <Image
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
          />
        ) : seoImageUrl ? (
          <Image
            src={seoImageUrl}
            blurDataURL={seoImageBlurUrl}
            placeholder="blur"
            quality={100}
            layout="fill"
            objectFit="cover"
            aria-hidden
            className={cl(`${styles.sectionImage}`, {
              [`${styles.betaHue}`]: article?.status?.tag === "beta",
            })}
            decoding="auto"
          />
        ) : (
          <Image
            src={getImage(article?.heading ?? "", "thumbnail")}
            layout="fill"
            objectFit="contain"
            aria-hidden
            className={styles.sectionImage}
            decoding="auto"
          />
        )}
      </div>
      <div>
        <HStack gap="space-8">
          <Tag
            type={article._type}
            text={article.tema ? article.tema[0] : undefined}
          />
          {article.status?.tag === "beta" && <BetaTag />}
        </HStack>
        <Heading size="large" level="3">
          <Link
            as={NextLink}
            onClick={() =>
              umamiTrack("navigere", {
                kilde: "global sok",
                url: `/${article.slug.current}`,
              })
            }
            href={`/${article.slug.current}`}
            className={styles.highlightLink}
          >
            {article?.heading}
          </Link>
        </Heading>
        <BodyLong className="mb-4" size="medium">
          {article?.ingress ?? article.seo?.meta}
        </BodyLong>
        {showFooter && getAuthors(article as any).length > 0 && (
          <BodyShort size="small" className={styles.highlightAuthor}>
            <span className="font-semibold">
              {getAuthors(article as any)[0]}
            </span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
    </section>
  );
};
