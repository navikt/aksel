import { notFound } from "next/navigation";
import { BodyLong, Stack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY,
  GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { GodPraksisIntroHero } from "@/app/dev/(god-praksis)/_ui/hero/Hero";

type Props = {
  params: Promise<{ tema: string }>;
};

/* export async function generateMetadata(
  _,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: "God praksis",
    description:
      seo?.meta ??
      `Mange som jobber med produktutvikling i Nav sitter på kunnskap og erfaring som er nyttig for oss alle. Det er god praksis som vi deler her.`,
    openGraph: {
      images: ogImages,
    },
  };
} */

export default async function Page({ params }: Props) {
  const { tema } = await params;

  const [{ data: temaPage }, { data: articleList }] = await Promise.all([
    sanityFetch({
      query: GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
      params: { slug: tema },
    }),
    sanityFetch({
      query: GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY,
      params: { slug: tema },
    }),
  ]);

  if (!temaPage || !articleList || articleList.length === 0) {
    notFound();
  }

  return (
    <div>
      <GodPraksisIntroHero title="God praksis">
        <BodyLong data-text-prose spacing>
          Mange som jobber med produktutvikling i Nav sitter på kunnskap og
          erfaring som er nyttig for oss alle. Det er god praksis som vi deler
          her.
        </BodyLong>
        <nav aria-label="Temavelger">
          <Stack
            gap={{ xs: "space-12", md: "space-24" }}
            wrap
            direction={{ xs: "column", md: "row" }}
            as="ul"
          >
            {/* {filteredTemaList.map((tema) => {
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
            })} */}
          </Stack>
        </nav>
      </GodPraksisIntroHero>

      {/* <VStack
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
                  data-umami-event="navigere"
                  data-umami-event-kilde="god praksis forside"
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
      </VStack> */}
    </div>
  );
}

/* function GodPraksisTaxonomyTag({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "innholdstype" | "undertema";
}) {
  if (!children) {
    return null;
  }

  return (
    <Tag
      variant={type === "undertema" ? "alt3-moderate" : "alt1-moderate"}
      size="xsmall"
      icon={
        type === "undertema" ? (
          <TagFillIcon aria-hidden />
        ) : (
          <FileFillIcon aria-hidden />
        )
      }
    >
      {children}
    </Tag>
  );
} */
