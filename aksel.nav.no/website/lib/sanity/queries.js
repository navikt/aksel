import {
  grunnleggendeKategorier,
  komponentKategorier,
} from "../../sanity/config";

const markDef = `
markDefs[]{
  ...,
  _type == 'internalLink' => {
      "slug": @.reference->slug,
  },
}`;

const alert = `_type == "alert" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const tips = `_type == "tips" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const introSeksjon = `_type == "intro_komponent" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const relatertInnhold = `_type == "relatert_innhold" =>{
  lenker[]{
    ...,
    "intern_lenke": intern_lenke->slug.current,
  }
}`;

const innholdsKort = `_type == "innholdskort" =>{
  ...,
  "lenke": lenke->slug.current,
}`;

const liveSeksjon = `_type == "live_demo" =>{
  ...,
  "sandbox_ref": sandbox_ref->{...},
}`;

const installSeksjon = `_type == "installasjon_seksjon" =>{
  ...,
  "code_ref": code_ref->{...},
}`;

const defaultBlock = `
 _type == "riktekst_blokk" =>{
    ...,
    body[]{
      ...,
      ${markDef}
    }
 },
 _type == "bilde" =>{
    ...,
    floating_text[]{
      ...,
      ${markDef}
    }
 },
 _type == "video" =>{
    ...,
    "webm": {
      "url": webm.asset->url,
      "extension": webm.asset->extension
    },
    "fallback": {
      "url": fallback.asset->url,
      "extension": fallback.asset->extension
    }
 },
 _type == "alert" =>{
    ...,
    body[]{
      ...,
      ${markDef}
    }
 },
 _type == "kode" =>{
    ...,
    "ref": ref->{...},
 },
 _type == "kode_eksempler" =>{
    ...,
    dir->,
    filnavn->,
 },
 _type == "kode_ref" => @->,
 ${tips},
 ${relatertInnhold}
`;

const accordionBlock = `_type == "accordion"=>{
  ...,
  list[]{
    ...,
    content[]{
      ...,
      ${defaultBlock}
    }
  }
}`;

const spesialSeksjon = `_type == "spesial_seksjon" =>{
  ...,
  modul == "komponentoversikt" =>{
    "komponenter": *[_type == 'komponent_artikkel' && !(_id in path("drafts.**"))]{
      _id,
      heading,
      "ingress": intro.body,
      status,
      slug,
    }
  },
  modul == "token_kategori" =>{
    "token": token_ref->{...}
}
}`;

const propsSeksjon = `_type == "props_seksjon" =>{
  ...,
  komponenter[]{
    ...,
    "propref": propref->{...}
  },
}`;

const tokenRef = `_type == "token_ref"=>@->`;

const deRefs = `
${alert},
${tips},
${tokenRef},
${markDef},
${introSeksjon},
${relatertInnhold},
${innholdsKort},
${liveSeksjon},
${propsSeksjon},
${installSeksjon},
${spesialSeksjon},
${accordionBlock},
${defaultBlock},
`;

export const allDocuments = `*[]{...,'slug': slug.current }`;

export const akselTema = `*[_type == "godpraksis_landingsside"][0]{
  "page": {
    ...,
    intro[]{
      ...,
      ${deRefs}
    }
  },
  "temaer": *[_type == "aksel_tema" && defined(seksjoner[].sider[])]{
    ...,
    "refCount": count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)])
  },
  "resent": *[_type == "aksel_artikkel" && defined(publishedAt)] | order(publishedAt desc)[0...9]{
    _id,
    heading,
    _createdAt,
    _updatedAt,
    publishedAt,
    "slug": slug.current,
    "tema": tema[]->title,
    ingress,
  }
}`;

const contributorsAll = `contributors[]->{
  anonym == true => {"title":@.anon_navn.current},
  anonym != true => {"title":@.title}
}`;

const contributorsSingle = `contributors[0]->{
  anonym == true => {"title":@.anon_navn.current},
  anonym != true => {"title":@.title}
}`;

export const akselBloggPosts = `*[_type == "blogg_landingsside"][0]{
  "page": {..., intro[]{...,${deRefs}}},
  "bloggposts": *[_type == "aksel_blogg"] | order(_createdAt desc){
    seo,
    heading,
    ingress,
    publishedAt,
    _createdAt,
    _id,
    "slug": slug.current,
    ${contributorsAll}
  }
}`;

export const akselForsideQuery = `*[_type == "aksel_forside"][0]{
  "page": {
    ...,
  },
  "bloggs": *[_type == "aksel_blogg"] | order(_createdAt desc)[0...4]{
    ...,
    "slug": slug.current,
    ${contributorsAll}
  },
  komigang[]{
    ...,
    "slug": reference->slug.current
  },
  tema[]{
    ...,
    ...ref->,
    "oppsummering": intro,
    ...ref->{"refCount": count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)])},
  },
  "temaCount": count(*[_type == "aksel_tema" && defined(seksjoner) && count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)]) > 0]),
  "resent": *[_type == "aksel_artikkel" && defined(publishedAt)] | order(publishedAt desc)[0...3]{
    _id,
    heading,
    _createdAt,
    _updatedAt,
    publishedAt,
    "slug": slug.current,
    "tema": tema[]->title,
    ingress,
  }
}`;

export const akselPrinsippBySlug = `{
  "prinsipp": *[slug.current == $slug] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    "content": select(
      $valid == "true" => content[]{
        ...,
        ${deRefs}
      },
      $valid != "true" => []
    ),
    ${contributorsAll}
  }
}`;

export const akselDocumentBySlug = `{
  "page": *[slug.current == $slug] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${deRefs}
    },
    tema[]->{title, slug, seo},
    ${contributorsAll},
    relevante_artikler[]->{
      _id,
      heading,
      _createdAt,
      _updatedAt,
      publishedAt,
      updateInfo,
      "slug": slug.current,
      "tema": tema[]->tag,
      ingress,
      "contributor": ${contributorsSingle},
    }
  }
}`;

export const akselEditorById = `*[_id == $id][0]
{
  ${contributorsAll}
}`;

const sidebarQuery = `"sidebar": *[_type == $type && defined(kategori)] {
  heading,
  "slug": slug.current,
  kategori,
  "tag": status.tag,
}`;

/**
 * "refs" må disables i preview da next-sanity sin
 * preview-funksjonalitet fører til en infinite loop som låser applikasjonen.
 * Dette er på grunn av av hele datasettet blir lastet inn i preview flere ganger som til slutt låser vinduet.
 */
export const komponentQuery = `{
  "page": *[_type == "komponent_artikkel" && slug.current == $slug] | order(_updatedAt desc)[0]
    {
      ...,
      "slug": slug.current,
      linked_package {
        "title": @->title,
        "github_link": @->github_link,
        "status": @->status
      },
      intro{
        ...,
        body[]{
          ...,
        ${deRefs}
        }
      },
      content[]{
        ...,
        ${deRefs}
      },
  },
  "refs": select(
    $preview == "true" => [],
    $preview != "true" => *[_type == "komponent_artikkel" && count(*[references(^._id)][slug.current == $slug]) > 0][0...3]{
      _id,
      heading,
      "slug": slug,
      status
    }
  ),
  "seo": *[_type == "komponenter_landingsside"][0].seo.image,
  ${sidebarQuery}
}`;

export const grunnleggendeQuery = `{
  "page": *[_type == "ds_artikkel" && slug.current == $slug] | order(_updatedAt desc)[0]
    {
      ...,
      "slug": slug.current,
      content[]{
        ...,
        ${deRefs}
      },
  },
  "seo": *[_type == "komponenter_landingsside"][0].seo.image,
  ${sidebarQuery}
}`;

export const akselTemaDocs = `{
  "tema": *[_type == "aksel_tema" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ...,
    "ansvarlig": ansvarlig->{title, roller},
    seksjoner[]{
      ...,
      beskrivelse[]{
        ...,
        ${deRefs}
      },
      sider[]->{
        _id,
        heading,
        _createdAt,
        _updatedAt,
        publishedAt,
        updateInfo,
        "slug": slug.current,
        "tema": tema[]->title,
        ingress,
        "contributor": ${contributorsSingle}
      }
    },
    "pictogram": pictogram.asset-> {
        url,
        altText,
    },
  }
}`;

export const akselBloggBySlug = `{
  "blogg": *[slug.current == $slug && _type == "aksel_blogg"] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    "content": select(
      $valid == "true" => content[]{
        ...,
        ${deRefs}
      },
      $valid != "true" => []
    ),
    ${contributorsAll}
  },
  "morePosts": *[_type == "aksel_blogg" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc)[0...3] {
    "slug": slug.current,
    heading,
    _createdAt,
    _id,
    ingress,
    ${contributorsAll},

  }
}`;

const landingsSideQuery = (t) => {
  const kat =
    t === "komponenter"
      ? komponentKategorier
      : t === "grunnleggende"
      ? grunnleggendeKategorier
      : [];

  return `"page": *[_type == "${t}_landingsside"][0]{
    ...,
    ${kat.map((x) => `intro_${x.value}[]{...,${deRefs}}`).join(",")}
  }`;
};

export const komponentLandingQuery = `{${sidebarQuery}, ${landingsSideQuery(
  "komponenter"
)}, "links": *[_type == "komponent_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori}}`;

export const grunnleggendeLandingQuery = `{${sidebarQuery}, ${landingsSideQuery(
  "grunnleggende"
)}, "links": *[_type == "ds_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori}}`;

export const akselStandaloneBySlug = `{
  "page": *[slug.current == $slug && _type == "aksel_standalone"] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${deRefs}
    }
  }
}`;

export const akselArticleFields = `
    _id,
    heading,
    _createdAt,
    _updatedAt,
    publishedAt,
    updateInfo,
    "slug": slug.current,
    "tema": tema[]->title,
    ingress,
    status,
    _type,
`;

export const akselArticleAll = (boundry = "") => {
  return `{
    "articles": *[_type == "aksel_artikkel" && defined(publishedAt)] | order(publishedAt desc)${boundry} {
      ${akselArticleFields}
    }
  }`;
};
