import cl from "clsx";
import { Image } from "sanity";
import { Detail, HStack, Stack, VStack } from "@navikt/ds-react";
import { LANDINGSSIDE_LATEST_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import ErrorBoundary from "@/error-boundary";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { abbrName, getImage } from "@/utils";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardImage,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";
import { BetaTag, Tag } from "./FrontpageTag";
import styles from "./frontpage.module.css";

type a =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["artikler"][number];
type b =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["bloggposts"][number];
type k =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["komponenter"][number];

export type ArticleT = a | k | b;

const isArticle = (article: ArticleT): article is a => {
  return article._type === "aksel_artikkel";
};

const isBlogg = (article: ArticleT): article is b => {
  return article._type === "aksel_blogg";
};

const isKomponent = (article: ArticleT): article is k => {
  return ["komponent_artikkel", "ds_artikkel", "templates_artikkel"].includes(
    article._type,
  );
};

type CardProps = {
  article: ArticleT;
  visible: boolean;
  index: number;
};

const Card = ({ article, visible, index }: CardProps) => {
  const date = useFormatedDate(article.publishedAt ?? article._updatedAt);

  const showAuthor = ["aksel_artikkel", "aksel_blogg"].includes(article._type);

  const showImage = [
    "ds_artikkel",
    "komponent_artikkel",
    "aksel_blogg",
    "templates_artikkel",
  ].includes(article._type);

  const imageUrl = urlForImage(article.seo?.image as Image)?.url();

  const getStatusTag = () => {
    if (isArticle(article) || isBlogg(article)) {
      return "";
    }
    return article.status?.tag;
  };

  return (
    <LinkCard
      className={cl(styles.card, {
        [`${styles.cardVisible}`]: visible,
        [`${styles.cardNotVisible}`]: !visible,
      })}
      style={{
        transitionDelay: `${index * 70}ms`,
      }}
      autoLayout={false}
    >
      <VStack className={styles.cardContent}>
        {showImage && (
          <HStack
            justify="center"
            width="100%"
            className={cl(`${styles.cardImageWrapper}`, {
              [`${styles.betaHue}`]: getStatusTag() === "beta",
            })}
          >
            <LinkCardImage
              src={
                imageUrl || getImage(article?.heading ?? "", "thumbnail") || ""
              }
              alt={article.heading + " thumbnail"}
            />
          </HStack>
        )}
        <div>
          <Stack direction="column-reverse">
            <LinkCardTitle
              as="h2"
              onClick={() =>
                umamiTrack("navigere", {
                  kilde: "forsidekort",
                  url: `/${article.slug}`,
                })
              }
            >
              <LinkCardAnchor href={`/${article.slug}`}>
                {article.heading}
              </LinkCardAnchor>
            </LinkCardTitle>
          </Stack>
          {isArticle(article) || isBlogg(article) ? (
            <LinkCardDescription>{article.ingress}</LinkCardDescription>
          ) : article.seo?.meta ? (
            <LinkCardDescription>{article.seo.meta}</LinkCardDescription>
          ) : null}
        </div>

        {showAuthor && (
          <span className={styles.cardAuthor}>
            {article?.contributors && (
              <Detail as="span" weight="semibold">
                {abbrName(
                  article.contributors[0].title ?? "Manglende Forfatter",
                )}
              </Detail>
            )}
            <Detail as="span">{date}</Detail>
          </span>
        )}

        <HStack gap="space-8">
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
        </HStack>
      </VStack>
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
