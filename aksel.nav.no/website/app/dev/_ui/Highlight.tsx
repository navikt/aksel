import cl from "clsx";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { urlFor } from "@/sanity/interface";
import { getAuthors, getImage } from "@/utils";
import { ArticleT } from "./Card";
import { Tag } from "./Tag";
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

  const imageUrl = urlFor(article.status?.bilde)
    ?.quality(100)
    .auto("format")
    .url();

  const imageBlurUrl = urlFor(article.status?.bilde)
    ?.width(24)
    .height(24)
    .blur(10)
    .url();

  const seoImageUrl = urlFor(article?.seo?.image)
    ?.quality(100)
    .auto("format")
    .url();

  const seoImageBlurUrl = urlFor(article?.seo?.image)
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
        <Tag
          type={article._type}
          text={article.tema ? article.tema[0] : undefined}
          beta={article?.status?.tag === "beta"}
        />
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
        <BodyLong className="mb-4" size="small">
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
