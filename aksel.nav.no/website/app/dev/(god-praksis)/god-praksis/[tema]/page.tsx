import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY,
  GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
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

  const sortedArticles = articleList
    .map((article) => {
      const _undertema = article.undertema?.find(
        (ut) => ut?.temaTitle === temaPage.title,
      )?.title;

      return {
        ...article,
        undertema: _undertema ?? "",
      };
    })
    .filter((article) => !!article.undertema)
    /* Makes sure sections always appear in the same order */
    .toSorted((a, b) => a.undertema.localeCompare(b.undertema));

  const innholdstypeParam =
    typeof searchParams.innholdstype === "string"
      ? decodeURIComponent(searchParams.innholdstype)
      : "";

  const undertemaParam =
    typeof searchParams.undertema === "string"
      ? decodeURIComponent(searchParams.undertema)
      : "";

  const parsedArticles = sortedArticles.map(({ undertema, innholdstype }) => ({
    undertema,
    innholdstype,
  }));

  return (
    <div>
      <GodPraksisIntroHero
        title={temaPage.title ?? "Tema"}
        description={temaPage.description}
        image={temaPage.pictogram}
        isCollapsible
      />
      <GodPrakisChipsNavigation
        articles={parsedArticles}
        innholdstype={innholdstypeParam}
        undertema={undertemaParam}
      />
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
