import NextImage from "next/image";
import Link from "next/link";
import { Image } from "sanity";
import { BodyLong, Box, HStack, Heading, Stack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { GOD_PRAKSIS_ALL_TEMA_QUERY } from "@/app/_sanity/queries";
import { GOD_PRAKSIS_TEMA_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardIcon,
  LinkCardTitle,
} from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import { GodPraksisPictogram } from "@/app/dev/(god-praksis)/_ui/pictogram/GodPraksisPictogram";
import { HeroCube } from "./Cube";
import styles from "./Hero.module.css";

type GpIntroHeroProps = {
  title: string;
  description?: string;
  image?: NonNullable<GOD_PRAKSIS_TEMA_BY_SLUG_QUERYResult>["pictogram"];
};

async function GodPraksisIntroHero({
  title,
  description,
  image,
}: GpIntroHeroProps) {
  const { data: temaList } = await sanityFetch({
    query: GOD_PRAKSIS_ALL_TEMA_QUERY,
  });

  const filteredTemaList = temaList.filter((x) => x.articles.length > 0);

  const imageUrl = urlForImage(image as Image)?.url();

  return (
    <Box
      paddingInline={{ xs: "space-16", lg: "space-40" }}
      paddingBlock={{ xs: "space-16 space-12", lg: "space-40 space-24" }}
      className={styles.godPraksisHero}
    >
      <HeroCube />
      <HStack gap="space-12" align="center" marginBlock="0 space-16">
        {imageUrl && <GodPraksisPictogram url={imageUrl} />}
        <Heading level="1" size="xlarge" className={styles.godPraksisHeroTitle}>
          {title}
        </Heading>
      </HStack>
      {description && (
        <BodyLong data-text-prose spacing>
          {description}
        </BodyLong>
      )}
      <nav aria-label="Temavelger">
        <Stack
          gap={{ xs: "space-12", md: "space-24" }}
          wrap
          direction={{ xs: "column", md: "row" }}
          as="ul"
        >
          {filteredTemaList.map((tema) => {
            const url = urlForImage(tema.pictogram as Image)?.url();

            return (
              <li key={tema.slug}>
                <LinkCard data-color-role="brand-blue" hasArrow={false}>
                  <LinkCardIcon hasBackground={false}>
                    <GodPraksisPictogram url={url} />
                  </LinkCardIcon>
                  <LinkCardTitle as="h2">
                    <LinkCardAnchor href={`/god-praksis/${tema.slug}`}>
                      {tema.title ?? ""}
                    </LinkCardAnchor>
                  </LinkCardTitle>
                </LinkCard>
              </li>
            );
          })}
        </Stack>
      </nav>
    </Box>
  );
}

function GodPraksisTemaCard({
  href,
  imageSrc,
  title,
}: {
  href: string;
  imageSrc?: string;
  title?: string;
}) {
  if (!title) {
    return null;
  }

  return (
    <Link href={href} prefetch={false} className={styles.godPraksisTemaCard}>
      <span>
        {imageSrc ? (
          <NextImage
            src={imageSrc}
            decoding="sync"
            width={32}
            height={32}
            aria-hidden
            priority
            alt={`${title} pictogram`}
          />
        ) : (
          <FallbackImage />
        )}
      </span>
      <Heading as="span" size="small">
        {title}
      </Heading>
    </Link>
  );
}

function FallbackImage() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.2636 17.7856L19.92 0.442043C19.3306 -0.147348 18.375 -0.147348 17.7856 0.442043L0.442044 17.7856C-0.147347 18.375 -0.147348 19.3306 0.442043 19.92L17.7856 37.2636C18.375 37.853 19.3306 37.853 19.92 37.2636L37.2636 19.92C37.853 19.3306 37.853 18.375 37.2636 17.7856Z"
        className="fill-teal-200 group-aria-[current]:fill-teal-500"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2452 16.4452C23.244 16.4464 23.2427 16.4476 23.2415 16.4489L14.8452 24.8452C14.1943 25.4961 13.139 25.4961 12.4882 24.8452C11.8373 24.1943 11.8373 23.139 12.4882 22.4882L21.0823 13.894C22.295 12.6813 23.9398 12 25.6549 12L45.5333 12C49.1048 12 52 14.8952 52 18.4667L52 38.3451C52 40.0602 51.3187 41.705 50.106 42.9177L41.5118 51.5118C40.861 52.1627 39.8057 52.1627 39.1548 51.5118C38.5039 50.861 38.5039 49.8057 39.1548 49.1548L47.5526 40.757C47.5534 40.7563 47.5541 40.7556 47.5548 40.7548C48.5976 39.712 48.5976 38.0213 47.5548 36.9785L27.0215 16.4452C25.9787 15.4024 24.288 15.4024 23.2452 16.4452ZM48.6667 33.3763L48.6667 18.4667C48.6667 16.7362 47.2638 15.3333 45.5333 15.3333L30.6237 15.3333L48.6667 33.3763ZM29.8452 34.1548C30.4961 34.8057 30.4961 35.861 29.8452 36.5119L14.8452 51.5119C14.1943 52.1627 13.139 52.1627 12.4882 51.5119C11.8373 50.861 11.8373 49.8057 12.4882 49.1548L27.4882 34.1548C28.139 33.504 29.1943 33.504 29.8452 34.1548Z"
        className="fill-text-default group-aria-[current]:fill-text-on-inverted"
      />
    </svg>
  );
}

export { GodPraksisIntroHero, GodPraksisTemaCard };
