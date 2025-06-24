import { defineQuery } from "next-sanity";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";

const DESIGNSYSTEM_TYPES = `"komponent_artikkel", "ds_artikkel", "templates_artikkel"`;

const DESIGNSYSTEM_SIDEBAR_QUERY =
  defineQuery(`*[_type in [${DESIGNSYSTEM_TYPES}] && defined(kategori)] {
  _type,
  heading,
  "slug": slug.current,
  kategori,
  "tag": status.tag,
  "sidebarindex": sidebarindex,
}`);

const DESIGNSYSTEM_OVERVIEW_PAGES_QUERY = defineQuery(
  `*[_type == "komponenter_landingsside" || _type == "grunnleggende_landingsside" || _type == "templates_landingsside"] {
  _type,
  overview_pages
  }`,
);

const BLOGG_LANDINGSSIDE_BLOGS_QUERY = defineQuery(`
  *[_type == "blogg_landingsside"][0]{
    "bloggposts": *[_type == "aksel_blogg"] | order(publishedAt desc, _createdAt desc){
      seo,
      heading,
      ingress,
      publishedAt,
      _createdAt,
      _id,
      "slug": slug.current,
      ${contributorsAll}
    }
  }`);

const BLOGG_LANDINGSSIDE_PAGE_QUERY = defineQuery(`
  *[_type == "blogg_landingsside"][0]{
    "page": {...},
  }`);

const DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY = defineQuery(
  `*[_type == "komponenter_landingsside"][0]`,
);

const DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY = defineQuery(
  `*[_type == "grunnleggende_landingsside"][0]`,
);

const DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY = defineQuery(
  `*[_type == "templates_landingsside"][0]`,
);

const GLOBAL_SEARCH_QUERY_ALL = defineQuery(
  `*[_type in ["komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
  "templates_artikkel"]]{
    heading,
    "slug": slug.current,
    "tema": undertema[]->tema->title,
    ingress,
    status,
    _type,
    "intro": pt::text(intro.body),
    content,
    publishedAt,
    seo
}`,
);

const KOMPONENT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "komponent_artikkel" && slug.current == $slug][0]
  {
    ...,
    intro{
      ...,
      body[]{
        ...,
      ${destructureBlocks}
      }
    },
    content[]{
      ...,
      ${destructureBlocks}
    },
}`);

const DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY =
  defineQuery(`*[_type == $docType  && kategori == $category]
  {
    _id,
    heading,
    "slug": slug.current,
    status,
    kategori,
    "sidebarindex": sidebarindex,
    "description": seo.meta
}`);

const DESIGNSYSTEM_OVERVIEW_BY_TYPE_QUERY = defineQuery(
  `*[_type == $docType && defined(kategori)]{
  _id,
  heading,
  "slug": slug.current,
  status,
  kategori,
  sidebarindex
}`,
);

const GRUNNLEGGENDE_BY_SLUG_QUERY =
  defineQuery(`*[_type == "ds_artikkel" && slug.current == $slug][0]
  {
    ...,
    content[]{
      ...,
      ${destructureBlocks}
    },
}`);

const MONSTER_MALER_BY_SLUG_QUERY =
  defineQuery(`*[_type == "templates_artikkel" && slug.current == $slug][0]
  {
    ...,
    content[]{
      ...,
      ${destructureBlocks}
    },
}`);

const BLOGG_BY_SLUG_QUERY =
  defineQuery(`*[_type == "aksel_blogg" && slug.current == $slug][0]
{
  ...,
  "slug": slug.current,
  content[]{
    ...,
    ${destructureBlocks}
  },
  ${contributorsAll},
  publishedAt,
}`);

const TOC_BY_SLUG_QUERY =
  defineQuery(`*[slug.current == $slug][0].content[style match 'h2'][]{
  "id": _key,
  "title": pt::text(@)
}`);

const METADATA_BY_SLUG_QUERY = defineQuery(`*[slug.current == $slug][0]{
  heading,
  ingress,
  publishedAt,
  seo
}`);

const SLUG_BY_TYPE_QUERY = defineQuery(`
  *[_type == $type && defined(slug.current)].slug.current
`);

export const ENDRINGSLOGG_FIELDS =
  'heading, "slug": slug.current, endringsdato, endringstype, fremhevet, herobilde, innhold, visMer';
const ENDRINGSLOGG_QUERY = defineQuery(`
  *[_type == "ds_endringslogg_artikkel"]{
    ${ENDRINGSLOGG_FIELDS}
  }`);

const ENDRINGSLOGG_WITH_NEIGHBORS_QUERY = defineQuery(`
  *[_type == "ds_endringslogg_artikkel" && slug.current == $slug][0]{
    "primary": {
      ${ENDRINGSLOGG_FIELDS}
    },
    "previous": *[_type == "ds_endringslogg_artikkel" && endringsdato < ^.endringsdato] | order(endringsdato desc)[0]{
      ${ENDRINGSLOGG_FIELDS}
    },
    "next": *[_type == "ds_endringslogg_artikkel" && endringsdato > ^.endringsdato] | order(endringsdato asc)[0]{
      ${ENDRINGSLOGG_FIELDS}
    }
  }
`);

const ENDRINGSLOGG_METADATA_BY_SLUG_QUERY =
  defineQuery(`*[slug.current == $slug][0]{
    heading,
    endringsdato,
    endringstype,
    herobilde
  }`);

/* ------------------------------- God praksis ------------------------------ */
const GOD_PRAKSIS_ALL_TEMA_QUERY =
  defineQuery(`*[_type == "gp.tema"] | order(lower(title)){
  title,
  _updatedAt,
  description,
  pictogram,
  "slug": slug.current,
  "articles": *[_type=="aksel_artikkel"
    && (^._id in undertema[]->tema._ref)] {
      heading,
      "slug": slug.current,
      "undertema": undertema[]->{title, "temaTitle": tema->title},
      "innholdstype": innholdstype->title,
      "views": *[_type == "article_views" && article_ref._ref == ^._id][0].views_month
    } | order(coalesce(views, -1) desc)[0...4]{
      heading,
      slug,
      undertema,
      innholdstype
    },
}`);

const GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY = defineQuery(
  `*[_type == "godpraksis_landingsside"][0].seo`,
);

const GOD_PRAKSIS_TEMA_BY_SLUG_QUERY = defineQuery(
  `*[_type == "gp.tema" && slug.current == $slug][0]{
    ...,
    "undertema": *[_type == "gp.tema.undertema" && tema->slug.current == $slug]{
      title,
      description
    },
  }`,
);

const GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY = defineQuery(
  `*[_type == "aksel_artikkel" && defined(undertema) && $slug in undertema[]->tema->slug.current] | order(updateInfo.lastVerified desc) {
    _id,
    heading,
    "displayDate": updateInfo.lastVerified,
    "description": ingress,
    "undertema": undertema[]->{title, "temaTitle": tema->title},
    "innholdstype": innholdstype->title,
    "slug": slug.current,
  }`,
);

const GOD_PRAKSIS_ARTICLE_BY_SLUG_QUERY = defineQuery(
  `*[slug.current == $slug && _type == "aksel_artikkel"][0]
  {
    ...,
    content[]{
      ...,
      ${destructureBlocks}
    },
    "innholdstype": innholdstype->title,
    "undertema": undertema[]->{
      title,
      "tema": tema->{
        title,
        "slug": slug.current,
        "image": seo.image
      }
    },
    ${contributorsAll},
    relevante_artikler[]->{
      heading,
      ingress,
      slug,
      "innholdstype": innholdstype->title,
    }
  }`,
);

const GOD_PRAKSIS_TEMA_QUERY = defineQuery(
  `*[_type == "gp.tema"] | order(lower(title))`,
);

const LANDINGSSIDE_LATEST_QUERY = defineQuery(`
*[_type == "aksel_forside"][0]{
  blocks[]{
    ...,
    _type == "nytt_fra_aksel"=>{
      highlights[]->{
        ...,
        "slug": slug.current,
        "content": null,
        ${contributorsAll},
        "tema": undertema[]->tema->title,
      },
      "curatedRecent": {
        "bloggposts": *[_type == "aksel_blogg" && !(_id in ^.highlights[]._ref)] | order(_createdAt desc)[0...4]{
          _type,
          _id,
          heading,
          _createdAt,
          _updatedAt,
          publishedAt,
          "slug": slug.current,
          ingress,
          seo,
          ${contributorsAll}
        },
        "artikler": *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...8]{
          _type,
          _id,
          heading,
          _createdAt,
          _updatedAt,
          publishedAt,
          "slug": slug.current,
          "tema": undertema[]->tema->title,
          ingress,
          seo,
          ${contributorsAll}
        },
        "komponenter": *[_type in ["komponent_artikkel", "ds_artikkel", "templates_artikkel"] && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...7]{
          _type,
          _id,
          heading,
          "slug": slug.current,
          status,
          kategori,
          _createdAt,
          _updatedAt,
          publishedAt,
          seo,
          ${contributorsAll}
        },
      },
    }
  }
}.blocks
`);

const LANDINGSSIDE_META_QUERY = defineQuery(
  `*[_type == "aksel_forside"][0]{
  "page": {
    ...,
  }
}.page`,
);

/* ---------------------------- Standalone pages ---------------------------- */

const SIDE_ARTICLE_BY_SLUG_QUERY = defineQuery(`
*[slug.current == $slug && _type == "aksel_standalone"][0]
  {
    ...,
    content[]{
      ...,
      ${destructureBlocks}
    }
  }
`);

/* ------------------------------- Prinsipper ------------------------------- */
const PRINSIPPER_BY_SLUG_QUERY = defineQuery(`
  *[slug.current == $slug && _type == "aksel_prinsipp"][0]{
  ...,
  content[]{
    ...,
    ${destructureBlocks}
  },
  ${contributorsAll}
}`);

/* --------------------------------- Slack --------------------------------- */

const DOCUMENT_BY_ID_FOR_SLACK_QUERY = defineQuery(`*[_id == $id][0]{
      "id": _id,
      "title": heading,
      "editors": contributors[]->email,
      "slug": slug.current,
      "contacts": undertema[]->tema->contacts[]->email
    }`);

/* --------------------------------- Sitemap -------------------------------- */
const SITEMAP_LANDINGPAGES_QUERY = defineQuery(`
{
      "frontpage": *[_type == "aksel_forside"][0]._updatedAt,
      "godpraksis": *[_type == "godpraksis_landingsside"][0]._updatedAt,
      "blogg": *[_type == "blogg_landingsside"][0]._updatedAt,
}
  `);

const SITEMAP_ARTICLES_BY_TYPE_QUERY = defineQuery(`
  *[_type in $doctypes]{
    "slug": slug.current,
    _updatedAt
  }
  `);

/* --------------------------------- Exports -------------------------------- */
export {
  BLOGG_BY_SLUG_QUERY,
  BLOGG_LANDINGSSIDE_BLOGS_QUERY,
  BLOGG_LANDINGSSIDE_PAGE_QUERY,
  DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
  DESIGNSYSTEM_OVERVIEW_BY_TYPE_QUERY,
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
  DESIGNSYSTEM_SIDEBAR_QUERY,
  DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
  DOCUMENT_BY_ID_FOR_SLACK_QUERY,
  ENDRINGSLOGG_METADATA_BY_SLUG_QUERY,
  ENDRINGSLOGG_QUERY,
  ENDRINGSLOGG_WITH_NEIGHBORS_QUERY,
  GLOBAL_SEARCH_QUERY_ALL,
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  GOD_PRAKSIS_ARTICLES_BY_TEMA_QUERY,
  GOD_PRAKSIS_ARTICLE_BY_SLUG_QUERY,
  GOD_PRAKSIS_LANDING_PAGE_SEO_QUERY,
  GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
  GOD_PRAKSIS_TEMA_QUERY,
  GRUNNLEGGENDE_BY_SLUG_QUERY,
  KOMPONENT_BY_SLUG_QUERY,
  LANDINGSSIDE_LATEST_QUERY,
  LANDINGSSIDE_META_QUERY,
  METADATA_BY_SLUG_QUERY,
  MONSTER_MALER_BY_SLUG_QUERY,
  PRINSIPPER_BY_SLUG_QUERY,
  SIDE_ARTICLE_BY_SLUG_QUERY,
  SITEMAP_ARTICLES_BY_TYPE_QUERY,
  SITEMAP_LANDINGPAGES_QUERY,
  SLUG_BY_TYPE_QUERY,
  TOC_BY_SLUG_QUERY,
};
