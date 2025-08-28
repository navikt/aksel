import { sanityCategoryLookup } from "../config";

const markDef = `
markDefs[]{
  ...,
  _type == 'internalLink' => {
      "slug": @.reference->slug,
  },
}`;

const language = `_type == "language" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const alert = `_type == "alert" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const attachment = `_type == "attachment" =>{
  ...,
  "downloadLink": asset->url,
  "size": asset->size,
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
  title,
  lenker[]{
    ...,
    "intern_lenke": intern_lenke->slug.current,
  }
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
    },
    "track": track.asset->url
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
      ${markDef},
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
  "token": token_ref->{...}
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
${language},
${alert},
${attachment},
${tips},
${tokenRef},
${markDef},
${introSeksjon},
${relatertInnhold},
${liveSeksjon},
${propsSeksjon},
${installSeksjon},
${spesialSeksjon},
${accordionBlock},
${expansionCardBlock},
${defaultBlock},
`;

export const contributorsAll = `contributors[]->{title}`;
export const writersAll = `writers[]->{title, description, avatar_id, type}`;

export const sidebarQuery = `"sidebar": *[_type == $type && defined(kategori)] {
  heading,
  "slug": slug.current,
  kategori,
  "tag": status.tag,
  "sidebarindex": sidebarindex,
}`;

export const landingPageQuery = (t) => {
  const kat = sanityCategoryLookup(t);

  return `"page": *[_type == "${t}_landingsside"][0]{
    ...,
    ${kat.map((x) => `intro_${x.value}[]{...,${destructureBlocks}}`).join(",")}
  }`;
};
