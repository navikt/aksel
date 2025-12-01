import cl from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HStack, LinkCard, VStack } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardImage,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { LANDINGSSIDE_LATEST_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { Avatar, AvatarStack, avatarUrl } from "@/app/_ui/avatar/Avatar";
import ErrorBoundary from "@/error-boundary";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { humanizeRedaksjonType } from "@/ui-utils/format-text";
import { BetaTag, Tag } from "./FrontpageTag";
import styles from "./frontpage.module.css";

type gp_article =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["artikler"][number];
type blogg_article =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["bloggposts"][number];
type component_article =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["komponenter"][number];

export type ArticleT = gp_article | component_article | blogg_article;

export const isArticle = (article: ArticleT): article is gp_article => {
  return article._type === "aksel_artikkel";
};

export const isBlogg = (article: ArticleT): article is blogg_article => {
  return article._type === "aksel_blogg";
};

export const isKomponent = (
  article: ArticleT,
): article is component_article => {
  return ["komponent_artikkel", "ds_artikkel", "templates_artikkel"].includes(
    article._type,
  );
};

type CardProps = {
  article: ArticleT;
  visible: boolean;
  index: number;
};

const Card = ({ article, visible }: CardProps) => {
  const showImage = [
    "ds_artikkel",
    "komponent_artikkel",
    "aksel_blogg",
    "templates_artikkel",
  ].includes(article._type);

  const imageUrl = urlForImage(article.seo?.image)?.url();

  const getStatusTag = () => {
    if (isArticle(article) || isBlogg(article)) {
      return "";
    }
    return article.status?.tag;
  };

  return (
    <LinkCard className={styles.card} data-visible={visible}>
      {showImage && (
        <LinkCardImage
          aspectRatio="16/9"
          className={cl(`${styles.cardImageWrapper}`, {
            [`${styles.betaHue}`]: getStatusTag() === "beta",
          })}
        >
          <Image
            src={
              imageUrl ||
              fallbackImageUrl(article?.heading ?? "", "thumbnail") ||
              ""
            }
            alt={article.heading + " thumbnail"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </LinkCardImage>
      )}
      <LinkCardTitle as="h2">
        <LinkCardAnchor asChild>
          <Link href={`/${article.slug}`}>{article.heading}</Link>
        </LinkCardAnchor>
      </LinkCardTitle>
      {isArticle(article) || isBlogg(article) ? (
        <LinkCardDescription data-clamp-text="4-lines">
          {article.ingress}
        </LinkCardDescription>
      ) : article.seo?.meta ? (
        <LinkCardDescription data-clamp-text="4-lines">
          {article.seo.meta}
        </LinkCardDescription>
      ) : null}

      {(isArticle(article) ||
        isBlogg(article) ||
        (isKomponent(article) && article.status?.tag === "beta")) && (
        <VStack asChild gap="space-12" align="start">
          <LinkCardFooter>
            {isBlogg(article) && (
              <HStack as="span" gap="space-8">
                <AvatarStack showNames>
                  {article.writers?.map((writer) => {
                    return (
                      <Avatar
                        type={humanizeRedaksjonType(writer.type)}
                        name={writer.title ?? ""}
                        key={writer.title}
                        imageSrc={avatarUrl(
                          writer.avatar_id?.current ?? "missing",
                        )}
                      />
                    );
                  })}
                </AvatarStack>
              </HStack>
            )}

            {isArticle(article) && (
              <Tag
                type={article._type}
                text={article.tema?.[0] ?? undefined}
                size="xsmall"
              />
            )}
            {isKomponent(article) && article.status?.tag === "beta" && (
              <BetaTag />
            )}
          </LinkCardFooter>
        </VStack>
      )}
    </LinkCard>
  );
};

export default function Component(props: CardProps) {
  return (
    <ErrorBoundary boundaryName="FrontpageBlockCard">
      <Card {...props} />
    </ErrorBoundary>
  );
}
