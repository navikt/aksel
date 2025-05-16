import cl from "clsx";
import NextImage from "next/legacy/image";
import NextLink from "next/link";
import {
  BodyShort,
  Detail,
  HStack,
  Heading,
  Stack,
  VStack,
} from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import ErrorBoundary from "@/error-boundary";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { abbrName, getImage } from "@/utils";
import { BetaTag, Tag } from "./Tag";
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

  const statusImageUrl = urlForImage(article.status?.bilde)?.url();
  const statusImageBlurUrl = urlForImage(article.status?.bilde)
    ?.width(24)
    .height(24)
    .blur(10)
    .url();

  const fallbackImageUrl = urlForImage(article.seo?.image)?.url();
  const fallbackImageBlurUrl = urlForImage(article.seo?.image)
    ?.width(24)
    .height(24)
    .blur(10)
    .url();

  let Image = (
    <div className={styles.cardImageWrapper}>
      <NextImage
        layout="fill"
        objectFit="cover"
        src={getImage(article?.heading ?? "", "thumbnail")}
        alt={article.heading + " thumbnail"}
        aria-hidden
        className={styles.cardImage}
      />
    </div>
  );

  if (statusImageUrl) {
    Image = (
      <NextImage
        src={statusImageUrl}
        blurDataURL={statusImageBlurUrl}
        placeholder="blur"
        width="200"
        height="200"
        alt={article.heading + " thumbnail"}
        aria-hidden
      />
    );
  } else if (fallbackImageUrl) {
    Image = (
      <div className={styles.cardImageWrapper}>
        <NextImage
          src={fallbackImageUrl}
          blurDataURL={fallbackImageBlurUrl}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt={article.heading + " thumbnail"}
          aria-hidden
          className={styles.cardImage}
        />
      </div>
    );
  }

  return (
    <div
      className={cl(`${styles.card}`, {
        [`${styles.cardVisible}`]: visible,
        [`${styles.cardNotVisible}`]: !visible,
      })}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {showImage && (
        <div
          className={cl(`${styles.cardImageWrapperWrapper}`, {
            [`${styles.betaHue}`]: article?.status?.tag === "beta",
          })}
        >
          {Image}
        </div>
      )}
      <VStack
        padding={{ xs: "space-12", sm: "space-20" }}
        className={styles.cardContent}
      >
        <div>
          <Stack direction="column-reverse">
            <NextLink
              href={`/${article.slug}`}
              passHref
              className={styles.cardLink}
              onClick={() =>
                umamiTrack("navigere", {
                  kilde: "forsidekort",
                  url: `/${article.slug}`,
                })
              }
            >
              <Heading
                level="3"
                size="small"
                className={styles.cardLinkHeading}
              >
                {article.heading}
              </Heading>
            </NextLink>
          </Stack>
          {article.ingress ? (
            <BodyShort className={styles.cardIngress}>
              {article.ingress}
            </BodyShort>
          ) : article.seo?.meta ? (
            <BodyShort className={styles.cardIngress}>
              {article.seo.meta}
            </BodyShort>
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
    </div>
  );
};

export default function Component(props: CardProps) {
  return (
    <ErrorBoundary boundaryName="FrontpageBlockCard">
      <Card {...props} />
    </ErrorBoundary>
  );
}
