import { notFound } from "next/navigation";
import { BodyLong, HGrid, Heading, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY,
  GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERYResult } from "@/app/_sanity/query-types";
import { GodPrakisChipsNavigation } from "@/app/dev/(god-praksis)/_ui/chips-navigation/ChipsNavigation";
import { GodPraksisIntroHero } from "@/app/dev/(god-praksis)/_ui/hero/Hero";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ tema: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

type ArticleT = Omit<
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERYResult[number],
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

  const simplifiedArticles: {
    undertema: string;
    innholdstype: string;
  }[] = [];

  for (const article of articleList) {
    const relevantUndertema = article.undertema?.find(
      (ut) => ut?.temaTitle === temaPage.title,
    )?.title;

    if (relevantUndertema && article.innholdstype) {
      sortedArticles.push({
        ...article,
        innholdstype: article.innholdstype,
        undertema: relevantUndertema,
      });
      simplifiedArticles.push({
        undertema: relevantUndertema,
        innholdstype: article.innholdstype,
      });
    }
  }

  sortedArticles = sortedArticles.toSorted((a, b) =>
    a.undertema.localeCompare(b.undertema),
  );

  // For article display
  const groupByField = undertemaParam ? "innholdstype" : "undertema";
  const articlesMap: Record<
    string,
    { title: string; description?: string; articles: ArticleT[] }
  > = {};

  for (const article of sortedArticles) {
    simplifiedArticles.push({
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
      if (!articlesMap["all"]) {
        articlesMap["all"] = {
          title: `${
            innholdstypeTitleMap[article.innholdstype] ?? article.innholdstype
          } for ${article.undertema.toLocaleLowerCase()}`,
          description: undefined,
          articles: [],
        };
      }

      articlesMap["all"].articles.push(article);
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
              ? innholdstypeTitleMap[key] ?? key
              : article.undertema,
          description: description ?? undefined,
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
      <GodPrakisChipsNavigation
        articles={simplifiedArticles}
        innholdstype={innholdstypeParam}
        undertema={undertemaParam}
      />
      <div className="container mt-8">
        {Object.entries(articlesMap).length === 0 ? (
          <p>Ingen artikler funnet.</p>
        ) : (
          Object.values(articlesMap).map(({ title, description, articles }) => (
            <section aria-label="1" key={title} className="mb-10">
              <VStack gap="space-8" marginBlock="0 space-24">
                <Heading level="2" size="large">
                  {title}
                </Heading>
                {description && <BodyLong>{description}</BodyLong>}
              </VStack>
              <HGrid
                key={title}
                as="ul"
                columns={{ xs: 1, md: 2 }}
                gap={{ xs: "space-12", md: "space-24" }}
                marginBlock="0 space-24"
              >
                {articles.map((article) => (
                  <li key={article.slug}>
                    <a
                      href={`/dev/god-praksis/artikkel/${article.slug}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {article.heading}
                    </a>
                    {article.description && (
                      <p className="mt-1 text-gray-600">
                        {article.description}
                      </p>
                    )}
                  </li>
                ))}
              </HGrid>
            </section>
          ))
        )}
      </div>
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
