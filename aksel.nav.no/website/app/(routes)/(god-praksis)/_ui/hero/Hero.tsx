import NextImage from "next/image";
import { BodyLong, HStack, Heading, LinkCard, Stack } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { GodPraksisHeroButton } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero.button";
import { GodPraksisHeroDialog } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero.dialog";
import { GodPraksisHeroProvider } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero.provider";
import { GodPraksisPictogram } from "@/app/(routes)/(root)/_ui/pictogram/GodPraksisPictogram";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  GOD_PRAKSIS_ARTICLES_COUNT_BY_UNDERTEMA_ID_QUERY,
  GOD_PRAKSIS_TEMA_UNDERTEMA_QUERY,
} from "@/app/_sanity/queries";
import {
  type GOD_PRAKSIS_ALL_TEMA_QUERY_RESULT,
  GOD_PRAKSIS_TEMA_BY_SLUG_QUERY_RESULT,
} from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import styles from "./Hero.module.css";

type GpIntroHeroProps = {
  title: string;
  description?: string;
  image?: NonNullable<GOD_PRAKSIS_TEMA_BY_SLUG_QUERY_RESULT>["pictogram"];
  isCollapsible?: boolean;
};

async function GodPraksisIntroHero({
  title,
  description,
  image,
  isCollapsible = false,
}: GpIntroHeroProps) {
  const imageUrl = urlForImage(image)?.url();

  return (
    <GodPraksisHeroProvider>
      <div className={styles.heroCube}>
        <svg
          width="424"
          height="auto"
          viewBox="0 0 424 452"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className={styles.heroCubeSvg}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M854.257 -237.814C853.085 -238.986 851.186 -238.986 850.014 -237.814L638.27 -26.0697L427.029 -26.0665C426.233 -26.0665 425.47 -25.7504 424.908 -25.1878L214.354 185.365C213.937 185.508 213.545 185.747 213.212 186.08L1.34692 397.945C0.784302 398.507 0.468262 399.271 0.468262 400.066C0.468262 400.862 0.784302 401.625 1.34692 402.187L211.198 612.038L1.66406 821.571C0.80603 822.429 0.549438 823.72 1.01379 824.841C1.47815 825.962 2.57202 826.693 3.7854 826.693L215.331 826.69C216.127 826.69 216.89 826.374 217.452 825.811L429.319 613.945C430.177 613.087 430.434 611.797 429.969 610.676C429.505 609.555 428.411 608.824 427.198 608.824L222.679 608.827L429.319 402.187C429.882 401.624 430.198 400.861 430.198 400.066C430.198 399.27 429.882 398.507 429.319 397.944L223.173 191.799L426.708 191.796C427.504 191.796 428.267 191.48 428.83 190.918L639.805 -20.0573L850.017 190.154C851.189 191.326 853.089 191.326 854.26 190.154L1066.12 -21.7071C1066.68 -22.2697 1067 -23.0327 1067 -23.8284C1067 -24.624 1066.68 -25.3871 1066.12 -25.9497L854.257 -237.814ZM644.516 -23.8312L852.135 -231.45L1059.76 -23.8284L852.139 183.79L644.516 -23.8312ZM631.332 -20.0696L425.466 185.796L222.405 185.799L428.272 -20.0665L631.332 -20.0696ZM215.333 192.444L422.955 400.066L215.333 607.688L7.71094 400.066L215.333 192.444ZM216.895 614.827L419.955 614.824L214.088 820.69L11.0282 820.693L216.895 614.827Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {isCollapsible && <GodPraksisHeroButton />}
      <HStack gap="space-12" align="center" marginBlock="space-0 space-16">
        {imageUrl && <GodPraksisPictogram url={imageUrl} />}
        <Heading level="1" size="xlarge" data-aksel-heading-color>
          {title}
        </Heading>
      </HStack>
      {description && (
        <BodyLong
          data-text-prose
          data-collapsible={isCollapsible}
          className={styles.godPraksisHeroDescription}
        >
          {description}
        </BodyLong>
      )}
      {isCollapsible ? (
        <GodPraksisHeroDialog>
          <GodPraksisTemaList />
        </GodPraksisHeroDialog>
      ) : (
        <GodPraksisTemaList />
      )}
    </GodPraksisHeroProvider>
  );
}

async function GodPraksisTemaList() {
  const { data: temaList } = await sanityFetch({
    query: GOD_PRAKSIS_ALL_TEMA_QUERY,
  });

  return (
    <nav aria-label="Temavelger">
      <Stack
        gap={{ xs: "space-12", md: "space-24" }}
        wrap
        direction={{ xs: "column", md: "row" }}
        as="ul"
      >
        {temaList.map((tema) => {
          return <HeroTag key={tema._id} tema={tema} />;
        })}
      </Stack>
    </nav>
  );
}

async function HeroTag({
  tema,
}: {
  tema: GOD_PRAKSIS_ALL_TEMA_QUERY_RESULT[number];
}) {
  const { data: undertema } = await sanityFetch({
    query: GOD_PRAKSIS_TEMA_UNDERTEMA_QUERY,
    params: { temaId: tema._id },
  });

  const { data: articleCount } = await sanityFetch({
    query: GOD_PRAKSIS_ARTICLES_COUNT_BY_UNDERTEMA_ID_QUERY,
    params: { undertemaIds: undertema },
  });

  if (articleCount === 0) {
    return null;
  }

  const url = urlForImage(tema.pictogram)?.url();

  return (
    <li key={tema.slug}>
      <LinkCard arrow={false}>
        <LinkCardIcon>
          <GodPraksisPictogram url={url} />
        </LinkCardIcon>
        <LinkCardTitle as="h2">
          <LinkCardAnchor asChild>
            <NextLink href={`/god-praksis/${tema.slug}`}>
              {tema.title ?? ""}
            </NextLink>
          </LinkCardAnchor>
        </LinkCardTitle>
      </LinkCard>
    </li>
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
    <NextLink href={href} className={styles.godPraksisTemaCard}>
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
    </NextLink>
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
        fill="var(--ax-text-brand-blue-subtle)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2452 16.4452C23.244 16.4464 23.2427 16.4476 23.2415 16.4489L14.8452 24.8452C14.1943 25.4961 13.139 25.4961 12.4882 24.8452C11.8373 24.1943 11.8373 23.139 12.4882 22.4882L21.0823 13.894C22.295 12.6813 23.9398 12 25.6549 12L45.5333 12C49.1048 12 52 14.8952 52 18.4667L52 38.3451C52 40.0602 51.3187 41.705 50.106 42.9177L41.5118 51.5118C40.861 52.1627 39.8057 52.1627 39.1548 51.5118C38.5039 50.861 38.5039 49.8057 39.1548 49.1548L47.5526 40.757C47.5534 40.7563 47.5541 40.7556 47.5548 40.7548C48.5976 39.712 48.5976 38.0213 47.5548 36.9785L27.0215 16.4452C25.9787 15.4024 24.288 15.4024 23.2452 16.4452ZM48.6667 33.3763L48.6667 18.4667C48.6667 16.7362 47.2638 15.3333 45.5333 15.3333L30.6237 15.3333L48.6667 33.3763ZM29.8452 34.1548C30.4961 34.8057 30.4961 35.861 29.8452 36.5119L14.8452 51.5119C14.1943 52.1627 13.139 52.1627 12.4882 51.5119C11.8373 50.861 11.8373 49.8057 12.4882 49.1548L27.4882 34.1548C28.139 33.504 29.1943 33.504 29.8452 34.1548Z"
        fill="var(--ax-text-brand-blue-contrast)"
      />
    </svg>
  );
}

export { GodPraksisIntroHero, GodPraksisTemaCard };
