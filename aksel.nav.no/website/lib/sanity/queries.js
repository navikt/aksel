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
}
`;

const expansionCardBlock = `_type == "expansioncard"=>{
  ...,
  body[]{
    ...,
    ${markDef},
    ${defaultBlock}
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

export const destructureBlocks = `
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
${expansionCardBlock},
${defaultBlock},
`;

export const allDocuments = `*[]{...,'slug': slug.current }`;

export const akselTema = `*[_type == "godpraksis_landingsside"][0]{
  "page": {
    ...,
    intro[]{
      ...,
      ${destructureBlocks}
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

export const contributorsAll = `contributors[]->{
  anonym == true => {"title":@.anon_navn.current},
  anonym != true => {"title":@.title}
}`;

const contributorsSingle = `contributors[0]->{
  anonym == true => {"title":@.anon_navn.current},
  anonym != true => {"title":@.title}
}`;

export const akselForsideQuery = `*[_type == "aksel_forside"][0]{
  "page": {
    ...,
  },
  "tema": *[_type == "aksel_tema" && defined(seksjoner[].sider[])],
  blocks[]{
    ...,
    _type == "nytt_fra_aksel"=>{
      highlights[]->{
        ...,
        "content": null,
        ${contributorsAll},
        "tema": tema[]->title,
      },
      "curatedResent": {
        "bloggposts": *[_type == "aksel_blogg" && !(_id in ^.highlights[]._ref)] | order(_createdAt desc)[0...2]{
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
        "artikler": *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...3]{
          _type,
          _id,
          heading,
          _createdAt,
          _updatedAt,
          publishedAt,
          "slug": slug.current,
          "tema": tema[]->title,
          ingress,
          seo,
          ${contributorsAll}
        },
        "komponenter": *[_type in ["komponent_artikkel", "ds_artikkel"] && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...3]{
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
}`;

export const akselPrinsippBySlug = `{
  "prinsipp": *[slug.current == $slug] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    "content": select(
      $valid == "true" => content[]{
        ...,
        ${destructureBlocks}
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
      ${destructureBlocks}
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
        ${destructureBlocks}
        }
      },
      content[]{
        ...,
        ${destructureBlocks}
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
        ${destructureBlocks}
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
        ${destructureBlocks}
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

const landingsSideQuery = (t) => {
  const kat =
    t === "komponenter"
      ? komponentKategorier
      : t === "grunnleggende"
      ? grunnleggendeKategorier
      : [];

  return `"page": *[_type == "${t}_landingsside"][0]{
    ...,
    ${kat.map((x) => `intro_${x.value}[]{...,${destructureBlocks}}`).join(",")}
  }`;
};

export const komponentLandingQuery = `{${sidebarQuery}, ${landingsSideQuery(
  "komponenter"
)}, "links": *[_type == "komponent_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori}}`;

export const grunnleggendeLandingQuery = `{${sidebarQuery}, ${landingsSideQuery(
  "grunnleggende"
)}, "links": *[_type == "ds_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori}}`;

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
