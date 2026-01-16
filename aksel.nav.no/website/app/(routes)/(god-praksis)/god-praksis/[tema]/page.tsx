import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  BodyLong,
  Box,
  Detail,
  HGrid,
  Heading,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { GodPraksisTaxonomyTag } from "@/app/(routes)/(god-praksis)/_ui/GodPraksisTaxonomyTag";
import { GodPrakisChipsNavigation } from "@/app/(routes)/(god-praksis)/_ui/chips-navigation/ChipsNavigation";
import { GodPraksisIntroHero } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY,
  GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY_RESULT } from "@/app/_sanity/query-types";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { formatDateString } from "@/ui-utils/format-date";

/* We rely on seachparams for initial render, so need to force-dynamic */
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ tema: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { tema } = await params;

  const { data: seoData } = await sanityFetch({
    query: GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
    params: { slug: tema },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(seoData?.seo?.image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: seoData?.title ?? "Tema",
    description: seoData?.seo?.meta ?? seoData?.description,
    openGraph: {
      images: ogImages,
    },
    alternates: {
      canonical: `/god-praksis/${tema}`,
    },
  };
}

type ArticleT = Omit<
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY_RESULT[number],
  "undertema" | "innholdstype"
> & {
  undertema: string;
  innholdstype: string;
};

const innholdstypeTitleMap: Record<string, string> = {
  Guide: "Guider",
  Verktøy: "Verktøy",
  Retningslinje: "Retningslinjer",
};

type ValidArticlesT = ArticleT[];

export default async function Page(props: Props) {
  const { tema } = await props.params;
  const searchParams = await props.searchParams;

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

  const innholdstypeParam =
    typeof searchParams.innholdstype === "string"
      ? decodeURIComponent(searchParams.innholdstype)
      : "";

  const undertemaParam =
    typeof searchParams.undertema === "string"
      ? decodeURIComponent(searchParams.undertema)
      : "";

  let sortedArticles: ValidArticlesT = [];

  /**
   * We iterate over the articles and make sure they all have innholdstype and undertema,
   * while doing some parsing to make sure we have the right data-format.
   */
  for (const article of articleList) {
    const relevantUndertema = article.undertema?.find(
      (ut) => ut?.temaTitle === temaPage.title,
    )?.title;

    if (relevantUndertema && article.innholdstype) {
      sortedArticles.push({
        ...article,
        innholdstype: article.innholdstype,
        undertema: relevantUndertema,
        displayDate: formatDateString(article.displayDate ?? ""),
      });
    }
  }

  sortedArticles = sortedArticles.toSorted((a, b) =>
    a.undertema.localeCompare(b.undertema),
  );

  /* For article display */
  const groupByField = undertemaParam ? "innholdstype" : "undertema";

  /**
   * We create a map of articles, where the key is its own section:
   * - If no undertema or innholdstype is selected, we group by undertema.
   * - If undertema is selected, we group by innholdstype.
   * - If innholdstype is selected, we group by undertema.
   * - If both are selected, we only have one section.
   */
  const articlesMap: Record<
    string,
    {
      title: string;
      description?: string;
      articles: ArticleT[];
      ariaLabel: string;
    }
  > = {};

  const articlesByContext: {
    undertema: string;
    innholdstype: string;
  }[] = [];

  for (const article of sortedArticles) {
    articlesByContext.push({
      undertema: article.undertema,
      innholdstype: article.innholdstype,
    });

    const matchesUndertema =
      !undertemaParam || article.undertema === undertemaParam;
    const matchesInnholdstype =
      !innholdstypeParam || article.innholdstype === innholdstypeParam;

    if (!matchesUndertema || !matchesInnholdstype) {
      continue;
    }

    if (undertemaParam && innholdstypeParam) {
      if (!articlesMap.all) {
        const title = `${
          innholdstypeTitleMap[article.innholdstype] ?? article.innholdstype
        } for ${article.undertema.toLocaleLowerCase()}`;

        articlesMap.all = {
          title,
          description: undefined,
          ariaLabel: title,
          articles: [],
        };
      }

      articlesMap.all.articles.push(article);
    } else {
      const key = article[groupByField];

      if (!articlesMap[key]) {
        const description =
          groupByField !== "innholdstype"
            ? temaPage.undertema.find((ut) => ut.title === article.undertema)
                ?.description
            : undefined;

        articlesMap[key] = {
          title:
            groupByField === "innholdstype"
              ? (innholdstypeTitleMap[key] ?? key)
              : article.undertema,
          description: description ?? undefined,
          ariaLabel: `${
            groupByField === "innholdstype"
              ? `Innholdstype ${key}`
              : `Undertema ${article.undertema}`
          }`,
          articles: [],
        };
      }
      articlesMap[key].articles.push(article);
    }
  }

  return (
    <div>
      <GodPraksisIntroHero
        title={temaPage.title ?? "Tema"}
        description={temaPage.description}
        image={temaPage.pictogram}
        isCollapsible
      />
      <VStack
        gap="space-48"
        paddingBlock="space-24"
        paddingInline={{ xs: "space-16", lg: "space-40" }}
      >
        <GodPrakisChipsNavigation
          articles={articlesByContext}
          innholdstype={innholdstypeParam}
          undertema={undertemaParam}
        />
        <VStack gap="space-48">
          {Object.entries(articlesMap).length === 0 ? (
            <p>Ingen artikler funnet.</p>
          ) : (
            Object.values(articlesMap).map(
              ({ title, description, ariaLabel, articles }) => (
                <section aria-label={ariaLabel} key={title}>
                  <VStack gap="space-8" marginBlock="space-0 space-24">
                    <Heading level="2" size="large" data-aksel-heading-color>
                      {title}
                    </Heading>
                    {description && (
                      <BodyLong data-text-prose>{description}</BodyLong>
                    )}
                  </VStack>
                  <HGrid
                    key={title}
                    as="ul"
                    columns={{ xs: 1, md: 2 }}
                    gap={{ xs: "space-16", md: "space-24" }}
                  >
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <Box asChild height="100%">
                          <LinkCard>
                            <LinkCardTitle as="h3">
                              <LinkCardAnchor asChild>
                                <NextLink href={`/${article.slug}`}>
                                  {article.heading}
                                </NextLink>
                              </LinkCardAnchor>
                            </LinkCardTitle>

                            {article.description && (
                              <LinkCardDescription>
                                {article.displayDate && (
                                  <Box asChild marginBlock="space-0 space-8">
                                    <Detail
                                      as="time"
                                      textColor="subtle"
                                      uppercase
                                    >
                                      {article.displayDate}
                                    </Detail>
                                  </Box>
                                )}
                                <p>{article.description}</p>
                              </LinkCardDescription>
                            )}
                            <LinkCardFooter>
                              <GodPraksisTaxonomyTag type="undertema">
                                {article.undertema}
                              </GodPraksisTaxonomyTag>
                              <GodPraksisTaxonomyTag type="innholdstype">
                                {article.innholdstype}
                              </GodPraksisTaxonomyTag>
                            </LinkCardFooter>
                          </LinkCard>
                        </Box>
                      </li>
                    ))}
                  </HGrid>
                </section>
              ),
            )
          )}
        </VStack>
      </VStack>
    </div>
  );
}
