import cl from "clsx";
import { Detail, HStack, Stack, VStack } from "@navikt/ds-react";
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
import styles from "./landingpage.module.css";

export type ArticleT = {
  _key: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  heading: string;
  ingress?: string;
  slug: { current: string };
  seo?: {
    meta?: string;
    image?: any;
  };
  tema?: string[];
  status?: { tag: string; bilde?: any };
  publishedAt: string;
  contributors?: { title: string }[];
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

  const imageUrl = urlForImage(article.seo?.image)?.url();
  // TODO: use blur images? but <LinkCardImage> takes string URL for now
  /* const imageBlurUrl = urlForImage(article.seo?.image)
    ?.width(24)
    .height(24)
    .blur(10)
    .url(); */

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
              [`${styles.betaHue}`]: article?.status?.tag === "beta",
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
              className={styles.cardLink}
              onClick={() =>
                umamiTrack("navigere", {
                  kilde: "forsidekort",
                  url: `/${article.slug}`,
                })
              }
            >
              <LinkCardAnchor
                href={`/${article.slug}`}
                className={styles.cardAnchor}
              >
                {article.heading}
              </LinkCardAnchor>
            </LinkCardTitle>
          </Stack>
          {article.ingress ? (
            <LinkCardDescription>{article.ingress}</LinkCardDescription>
          ) : article.seo?.meta ? (
            <LinkCardDescription>{article.seo.meta}</LinkCardDescription>
          ) : null}
        </div>

        {showAuthor && (
          <span className={styles.cardAuthor}>
            {article?.contributors && (
              <Detail as="span" weight="semibold">
                {abbrName(article?.contributors[0]?.title)}
              </Detail>
            )}
            <Detail as="span">{date}</Detail>
          </span>
        )}

        <HStack gap="space-8">
          <Tag
            type={article._type}
            text={article.tema ? article.tema[0] : undefined}
            size="xsmall"
          />
          {article.status?.tag === "beta" && <BetaTag />}
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
