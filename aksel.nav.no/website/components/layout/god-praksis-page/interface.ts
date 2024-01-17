import { groq } from "next-sanity";

/**
 * `GP_LAZYLOADED_ARTICLES`: Number of articles loaded when clicking "load more"
 * `GP_INITIAL_ARTICLES`: Initial list-length of articles fetched in getStaticProps
 */
export const GP_LAZYLOADED_ARTICLES = 3;
export const GP_INITIAL_ARTICLES = 9;

export type GpTemaT = {
  title: string;
  slug: string;
  description?: string;
  undertema: { title: string; description: string }[];
};

export type GpInnholdstypeT = {
  title: string;
  description?: string;
  hasRefs: boolean;
};

/**
 * Page Hero
 */
export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    hasRefs: boolean;
  }[];
};

export const heroNavQuery = groq`
"heroNav": *[_type == "gp.tema"]{
  title,
  "slug": slug.current,
  "hasRefs": count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0
}
`;

export type heroNavQueryResponse = {
  heroNav: {
    title: string;
    slug: string;
    hasRefs: boolean;
  }[];
};

/**
 * Chips navigation
 */
export type ChipsData = {
  "undertema-title": string;
  "innholdstype-title": string;
}[];

export const chipsDataAllQuery = groq`
"chipsDataAll": *[_type == "aksel_artikkel" && defined(innholdstype) && defined(undertema)]{
  "innholdstype": innholdstype->title,
  "undertema": undertema[]->{title, "temaSlug": tema->slug.current}
}`;

export type chipsDataAllQueryResponse = {
  chipsDataAll: {
    innholdstype: string;
    undertema: { title: string; temaSlug: string }[];
  }[];
};

export const chipsUndertemaQuery = groq`
"chipsUndertema": *[_type == "gp.tema.undertema"]{
  title,
  "tema": tema->slug.current,
  "count": count(*[_type=="aksel_artikkel"
      && ^._id in undertema[]._ref])
}`;
export type chipsUndertemaQueryResponse = {
  chipsUndertema: {
    title: string;
    tema: string;
    count: number;
  }[];
};

export const chipsInnholdstypeQuery = groq`
"chipsInnholdstype": *[_type == "gp.tema.undertema"] {
  title,
  "slug": tema->slug.current,
  "types": *[_type== "gp.innholdstype"] {
    title,
    "count": count(*[_type == "aksel_artikkel"
      && (^._id == innholdstype._ref ) && (^.^._id in undertema[]._ref)])
  }
}`;
export type chipsInnholdstypeQueryResponse = {
  chipsInnholdstype: {
    title: string;
    slug: string;
    types: {
      title: string;
      count: number;
    }[];
  }[];
};

export type GpGroupedArticlesT = {
  innholdstype: string | null;
  undertema: string | null;
  article: GpArticleT;
}[];

export type GpGroupedArticlesInputT = {
  initialInnholdstype?: {
    title: string;
    articles: GpArticleT[];
  }[];

  initialUndertema?: {
    title: string;
    articles: GpArticleT[];
  }[];
};

export type GpEntryPageProps = HeroNavT & {
  tema: GpTemaT | null;
} & {
  initialArticles: GpGroupedArticlesT;
} & { chipsData: ChipsData };

export const temaQuery = groq`
"tema": *[_type == "gp.tema" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "undertema": *[_type == "gp.tema.undertema" && tema->slug.current == $slug]{
      title,
      description
    }
  }`;

export type temaQueryResponse = {
  tema: {
    [key: string]: any;
    title: string;
    slug: string;
    description?: string;
    undertema: { title: string; description: string }[];
  };
};

export const baseGpArticleData = groq`{
  _id,
  heading,
  ingress,
  "undertema": undertema[]->title,
  "innholdstype": innholdstype->title,
  "slug": slug.current,
  publishedAt
}
`;

export type GpArticleT = {
  _id: string;
  heading: string;
  ingress: string;
  undertema: string[];
  slug: string;
  innholdstype: string | null;
  publishedAt: string | null;
  currentUndertema?: string;
};

export const initialGpMainPageArticles = groq`
  "initialInnholdstype": *[_type == "gp.innholdstype"]{
    title,
    "articles": *[_type == "aksel_artikkel" && innholdstype._ref == ^._id]| order(publishedAt desc)[0...${GP_INITIAL_ARTICLES}]${baseGpArticleData}
  }`;

export type initialGpMainPageArticlesResponse = {
  initialInnholdstype: {
    title: string;
    articles: GpArticleT[];
  }[];
};

export const initialTemaPageArticles = groq`
  "initialUndertema": *[_type == "gp.tema.undertema" && $slug == tema->slug.current]{
    title,
    "articles": *[_type == "aksel_artikkel" && ^._id in undertema[]._ref] | order(publishedAt desc)[0...${GP_INITIAL_ARTICLES}]${baseGpArticleData}
  },
  "initialInnholdstype": *[_type == "gp.innholdstype"]{
    title,
    "articles": *[_type == "aksel_artikkel" && innholdstype._ref == ^._id && $slug in undertema[]->tema->slug.current]| order(publishedAt desc)[0...${GP_INITIAL_ARTICLES}]${baseGpArticleData}
  }`;

export type initialTemaPageArticlesResponse = {
  initialUndertema: {
    title: string;
    articles: GpArticleT[];
  }[];
  initialInnholdstype: {
    title: string;
    articles: GpArticleT[];
  }[];
};

/**
 * API-queries
 */
/**
 * @arguments innholdstype: string
 * @arguments undertema: string
 * @arguments start: number
 * @arguments end: number
 */
export const apiTemaPageQuery = groq`
    {
      "articles": {
        $undertema == "" && $innholdstype == "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $undertema != "" && $innholdstype == "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current && $undertema in undertema[]->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $undertema == "" && $innholdstype != "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current && $innholdstype == innholdstype->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $undertema != "" && $innholdstype != "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current && $undertema in undertema[]->title && $innholdstype == innholdstype->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        }
      }
    }
  `;

/**
 * @arguments innholdstype: string
 * @arguments start: number
 * @arguments end: number
 */
export const apiMainPageQuery = groq`
    {
      "articles": {
        $innholdstype == "" => {
          "articles": *[_type == 'aksel_artikkel' ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $innholdstype != "" => {
          "articles": *[_type == 'aksel_artikkel' && $innholdstype == innholdstype->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        }
      }
    }
`;
