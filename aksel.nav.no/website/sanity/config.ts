export const allArticleDocuments = [
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
];

export const allArticleDocsRef = allArticleDocuments.map((x) => ({ type: x }));

export const komponentKategorier = [
  { title: "Core", value: "core" },
  { title: "Internal", value: "internal" },
];

export const grunnleggendeKategorier = [
  { title: "Styling", value: "styling" },
  { title: "Guider", value: "guider" },
  { title: "Stæsj", value: "staesj" },
];

export const monsterKategorier = [];

export const bloggKategorier = [
  { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
  { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
  { title: "På reise", value: "pa-reise" },
];

export const prinsippKategorier = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];
