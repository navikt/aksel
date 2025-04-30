import { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Image } from "sanity";
import {
  BodyLong,
  HGrid,
  HStack,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { GodPraksisTaxonomyTag } from "@/app/dev/(god-praksis)/_ui/GodPraksisTaxonomyTag";
import { GodPraksisIntroHero } from "@/app/dev/(god-praksis)/_ui/hero/Hero";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardArrow,
  LinkCardFooter,
  LinkCardTitle,
} from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";

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
      images: urlForOpenGraphImage(seo?.image as Image),
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
              <VStack gap="space-8" marginBlock="0 space-24">
                <Heading level="2" size="large">
                  {tema.title}
                </Heading>
                {tema.description && <BodyLong>{tema.description}</BodyLong>}
              </VStack>
              <HGrid
                as="ul"
                columns={{ xs: 1, md: 2 }}
                gap={{ xs: "space-12", md: "space-24" }}
                marginBlock="0 space-24"
              >
                {tema.articles.map((article) => {
                  const undertema = article.undertema?.find(
                    (ut) => ut?.temaTitle === tema.title,
                  )?.title;
                  const innholdstype = article.innholdstype;

                  return (
                    <li key={article.slug}>
                      <LinkCard>
                        <LinkCardTitle as="h2">
                          <LinkCardAnchor href={article.slug ?? ""}>
                            {article.heading}
                          </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardFooter>
                          <HStack gap="space-12">
                            <GodPraksisTaxonomyTag type="undertema">
                              {undertema}
                            </GodPraksisTaxonomyTag>
                            <GodPraksisTaxonomyTag type="innholdstype">
                              {innholdstype}
                            </GodPraksisTaxonomyTag>
                          </HStack>
                        </LinkCardFooter>
                      </LinkCard>
                    </li>
                  );
                })}
              </HGrid>
              <h3>
                <Link
                  href={`/god-praksis/${tema.slug}`}
                  as={NextLink}
                  onClick={() =>
                    umamiTrack("navigere", {
                      kilde: "god praksis forside",
                    })
                  }
                  data-link-card-anchor
                  data-color-role="brand-blue"
                >
                  {`Alt fra ${tema.title} `}
                  <LinkCardArrow />
                </Link>
              </h3>
            </section>
          );
        })}
      </VStack>
    </div>
  );
}
