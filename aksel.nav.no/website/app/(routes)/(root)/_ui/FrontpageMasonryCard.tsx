import cl from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageType } from "sanity";
import { Detail, HStack, LinkCard, VStack } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardImage,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { LANDINGSSIDE_LATEST_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import ErrorBoundary from "@/error-boundary";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { abbrName } from "@/ui-utils/format-text";
import { getImage } from "@/utils";
import { BetaTag, Tag } from "./FrontpageTag";
import styles from "./frontpage.module.css";

type a =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["artikler"][number];
type b =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["bloggposts"][number];
type k =
  NonNullable<LANDINGSSIDE_LATEST_QUERYResult>[number]["curatedRecent"]["komponenter"][number];

export type ArticleT = a | k | b;

export const isArticle = (article: ArticleT): article is a => {
  return article._type === "aksel_artikkel";
};

export const isBlogg = (article: ArticleT): article is b => {
  return article._type === "aksel_blogg";
};

export const isKomponent = (article: ArticleT): article is k => {
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
  const date = useFormatedDate(article.publishedAt ?? article._updatedAt);

  const showAuthor = ["aksel_artikkel", "aksel_blogg"].includes(article._type);

  const showImage = [
    "ds_artikkel",
    "komponent_artikkel",
    "aksel_blogg",
    "templates_artikkel",
  ].includes(article._type);

  const imageUrl = urlForImage(article.seo?.image as ImageType)?.url();

  const getStatusTag = () => {
    if (isArticle(article) || isBlogg(article)) {
      return "";
    }
    return article.status?.tag;
  };

  const showFooter =
    showAuthor ||
    isArticle(article) ||
    (isKomponent(article) && article.status?.tag === "beta");

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
              imageUrl || getImage(article?.heading ?? "", "thumbnail") || ""
            }
            alt={article.heading + " thumbnail"}
            fill
          />
        </LinkCardImage>
      )}
      <LinkCardTitle as="h2">
        <LinkCardAnchor asChild>
          <Link
            onNavigate={() =>
              umamiTrack("navigere", {
                kilde: "forsidekort",
                url: `/${article.slug}`,
              })
            }
            href={`/${article.slug}`}
          >
            {article.heading}
          </Link>
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

      {showFooter && (
        <VStack asChild gap="space-12" align="start">
          <LinkCardFooter>
            {showAuthor && (
              <HStack as="span" gap="space-8">
                {article?.contributors && (
                  <Detail as="span" weight="semibold" textColor="subtle">
                    {abbrName(
                      article.contributors[0].title ?? "Manglende Forfatter",
                    )}
                  </Detail>
                )}
                <Detail as="span" textColor="subtle">
                  {date}
                </Detail>
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
