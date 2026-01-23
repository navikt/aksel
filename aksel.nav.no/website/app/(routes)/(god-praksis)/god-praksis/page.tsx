import { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import { NextLink } from "@/app/_ui/next-link/NextLink";

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
    stega: false,
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
  const { data: temaList } = await sanityFetch({
    query: GOD_PRAKSIS_ALL_TEMA_QUERY,
  });

  if (!temaList || temaList.length === 0) {
    notFound();
  }

  const filteredTemaList = temaList.filter((tema) => tema.articles.length > 0);

  return (
    <div>
      <GodPraksisIntroHero
        title="God praksis"
        description="Mange som jobber med produktutvikling i Nav sitter på kunnskap og
          erfaring som er nyttig for oss alle. Det er god praksis som vi deler
          her."
      />
      <VStack
        gap="space-48"
        paddingInline={{ xs: "space-16", lg: "space-40" }}
        paddingBlock="space-48"
      >
        {filteredTemaList.map((tema) => {
          return (
            <section key={tema.slug} aria-label={`Tema ${tema.title}`}>
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
                {tema.articles.map((article) => {
                  const undertema = article.undertema?.find(
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
                              {undertema}
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
        })}
      </VStack>
    </div>
  );
}
