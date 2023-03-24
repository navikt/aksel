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

export const contributorsAll = `contributors[]->{
  anonym == true => {"title":@.anon_navn.current},
  anonym != true => {"title":@.title}
}`;

export const contributorsSingle = `contributors[0]->{
  anonym == true => {"title":@.anon_navn.current},
  anonym != true => {"title":@.title}
}`;

export const sidebarQuery = `"sidebar": *[_type == $type && defined(kategori)] {
  heading,
  "slug": slug.current,
  kategori,
  "tag": status.tag,
}`;

export const landingPageQuery = (t) => {
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
