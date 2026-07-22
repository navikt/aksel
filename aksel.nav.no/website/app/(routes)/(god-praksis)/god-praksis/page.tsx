import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  BodyLong,
  BodyShort,
  Box,
  HGrid,
  Heading,
  Link,
  LinkCard,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { GodPraksisTaxonomyTag } from "@/app/(routes)/(god-praksis)/_ui/GodPraksisTaxonomyTag";
import { GodPraksisIntroHero } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
} from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  GOD_PRAKSIS_ARTICLES_BY_UNDERTEMA_ID_QUERY,
  GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
  GOD_PRAKSIS_TEMA_UNDERTEMA_QUERY,
} from "@/app/_sanity/queries";
import type { GOD_PRAKSIS_ALL_TEMA_QUERY_RESULT } from "@/app/_sanity/query-types";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import { NextLink } from "@/app/_ui/next-link/NextLink";

export async function generateMetadata(): Promise<Metadata> {
  const { perspective } = await getDynamicFetchOptions();
  const { data: seo } = await sanityFetchMetadata({
    query: GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
    perspective,
  });

  return {
    title: "God praksis",
    description:
      seo?.meta ??
      `Mange som jobber med produktutvikling i Nav sitter på kunnskap og erfaring som er nyttig for oss alle. Det er god praksis som vi deler her.`,
    openGraph: {
      images: urlForOpenGraphImage(seo?.image),
    },
  };
}

export default async function Page() {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return <CachedGodPraksis perspective="published" stega={false} />;
  }

  return (
    <Suspense fallback={null}>
      <DynamicGodPraksis />
    </Suspense>
  );
}

async function DynamicGodPraksis() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedGodPraksis perspective={perspective} stega={stega} />;
}

async function CachedGodPraksis({ perspective, stega }: DynamicFetchOptions) {
  "use cache";

  const { data: temaList } = await sanityFetch({
    query: GOD_PRAKSIS_ALL_TEMA_QUERY,
    perspective,
    stega,
  });

  if (!temaList || temaList.length === 0) {
    notFound();
  }

  return (
    <div>
      <GodPraksisIntroHero
        title="God praksis"
        description="Mange som jobber med produktutvikling i Nav sitter på kunnskap og
          erfaring som er nyttig for oss alle. Det er god praksis som vi deler
          her."
        perspective={perspective}
        stega={stega}
      />
      <VStack
        gap="space-48"
        paddingInline={{ xs: "space-16", lg: "space-40" }}
        paddingBlock="space-48"
      >
        {temaList.map((tema) => {
          return (
            <TemaSection
              key={tema.slug}
              tema={tema}
              perspective={perspective}
              stega={stega}
            />
          );
        })}
      </VStack>
    </div>
  );
}

async function TemaSection({
  tema,
  perspective,
  stega,
}: {
  tema: GOD_PRAKSIS_ALL_TEMA_QUERY_RESULT[number];
} & DynamicFetchOptions) {
  "use cache";

  const { data: undertema } = await sanityFetch({
    query: GOD_PRAKSIS_TEMA_UNDERTEMA_QUERY,
    params: { temaId: tema._id },
    perspective,
    stega,
  });

  const { data: articles } = await sanityFetch({
    query: GOD_PRAKSIS_ARTICLES_BY_UNDERTEMA_ID_QUERY,
    params: { undertemaIds: undertema },
    perspective,
    stega,
  });

  if (articles?.length === 0) {
    return null;
  }

  return (
    <section aria-label={`Tema ${tema.title}`}>
      <VStack gap="space-8" marginBlock="space-0 space-24">
        <Heading level="2" size="large">
          {tema.title}
        </Heading>
        {tema.description && <BodyLong>{tema.description}</BodyLong>}
      </VStack>
      <HGrid
        as="ul"
        columns={{ xs: 1, md: 2 }}
        gap={{ xs: "space-16", md: "space-24" }}
        marginBlock="space-0 space-24"
      >
        {articles.map((article) => {
          const undertemaTitle = article.undertema?.find(
            (ut) => ut?.temaTitle === tema.title,
          )?.title;
          const innholdstype = article.innholdstype;

          return (
            <li key={article.slug}>
              <Box asChild height="100%">
                <LinkCard>
                  <LinkCardTitle as="h3">
                    <LinkCardAnchor asChild>
                      <NextLink href={article.slug ?? ""}>
                        {article.heading}
                      </NextLink>
                    </LinkCardAnchor>
                  </LinkCardTitle>
                  <LinkCardFooter>
                    <GodPraksisTaxonomyTag type="undertema">
                      {undertemaTitle}
                    </GodPraksisTaxonomyTag>
                    <GodPraksisTaxonomyTag type="innholdstype">
                      {innholdstype}
                    </GodPraksisTaxonomyTag>
                  </LinkCardFooter>
                </LinkCard>
              </Box>
            </li>
          );
        })}
      </HGrid>
      <BodyShort as="h3" size="large">
        <Link
          href={`/god-praksis/${tema.slug}`}
          as={NextLink}
          data-animated-arrow-anchor
          data-color="brand-blue"
        >
          {`Alt fra ${tema.title} `}

          <AnimatedArrowRight />
        </Link>
      </BodyShort>
    </section>
  );
}
