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

export const akselTema = `{"temaer": *[_type == "aksel_tema"]{
  ...,
  "refCount": count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)])
}}`;

export const akselBloggPosts = `{
  "bloggposts": *[_type == "aksel_blogg"] | order(_createdAt desc){
    ...,
    "slug": slug.current,
    contributors[]->{
      title
    }
  }
}`;

export const akselForsideQuery = `*[_type == "vk_frontpage"][0]{
  "tekster": {
    ...,
    beskrivelse[]{
      ...,
      ${deRefs}
    }
  },
  prinsipp_1 {
    ...,
    hovedside->{slug, heading},
    undersider[]->{slug, heading}
  },
  "bloggs": *[_type == "aksel_blogg"] | order(_createdAt desc){
    ...,
    "slug": slug.current,
    contributors[]->{
      title
    }
  },
  "temaer": *[_type == "aksel_tema"]{
    ...,
    "refCount": count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)])
  }
}`;

export const akselDocumentsByType = `*[_type in $types]{ _type, _id, 'slug': slug.current }`;

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
    contributors[]->{
      title
    }
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
    tema[]->{title, slug},
    contributors[]->{
      title
    },
    relevante_artikler[]->{
      _id,
      heading,
      _createdAt,
      _updatedAt,
      publishedAt,
      "slug": slug.current,
      "tema": tema[]->tag,
      ingress,
      "contributor": contributors[0]->title,
    }
  }
}`;

export const akselEditorById = `*[_id == $id][0]
{
  contributors[]->{
    title
  }
}`;

export const dsDocuments = `*[_type in ["komponent_artikkel", "ds_artikkel"]]{ ..., 'slug': slug.current }`;

const dsNavQuery = `"navigation": *[_type == 'ds_navigation'][0] {
  "headings": headings[]{
    ...,
    link_ref->{_id, slug},
    menu[]{
      ...,
      link->{_id, slug, status},
    }
  }
}`;

export const dsFrontpageQuery = `{
  "page": *[_id == "frontpage_designsystem"][0]
  {
   ...,
    body[]{
      ...,
      ${deRefs}
    },
    cards[]{
      _type == "card" =>{
        ...,
        link_ref->{_id, "slug": slug.current}
      }
    }
  },
  ${dsNavQuery}
}`;

export const dsSlugQuery = `{
  "page": *[_type in ["komponent_artikkel", "ds_artikkel"] && slug.current == $slug] | order(_updatedAt desc)[0]
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
  ${dsNavQuery}
}`;

const sidebarQuery = `"sidebar": *[_type == $type && defined(kategori)] {
  heading,
  "slug": slug_v2.current,
  kategori
}`;

export const komponentQuery = `{
  "page": *[_type == "komponent_artikkel" && slug_v2.current == $slug] | order(_updatedAt desc)[0]
    {
      ...,
      "slug": slug_v2.current,
      linked_package {
        "title": @->title,
        "github_link": @->github_link,
        "status": @->status
      },
      "tag": status.tag,
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
  ${sidebarQuery}
}`;

export const dsNavigationQuery = `
*[_type == 'ds_navigation'][0] {
  "headings": headings[]{
    ...,
    link_ref->{_id, slug},
    menu[]{
      ...,
      link->{_id, slug, tags},
    }
  }
}
`;

export const akselTemaNames = `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0].slug`;

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
        "slug": slug.current,
        "tema": tema[]->tag,
        ingress,
        "contributor": contributors[0]->title,
      }
    }
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
    contributors[]->{
      title
    },
  }
}`;
