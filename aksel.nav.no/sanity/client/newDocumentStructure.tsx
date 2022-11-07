import S from "@sanity/base/structure-builder";

const docTypes = [
  {
    name: "aksel_artikkel",
    title: "Aksel Artikkel",
  },
  {
    name: "newEditor",
    title: "Bruker/redaktør",
    desc: "Lager en psuedo-bruker for deg som kan koble artikler til brukeren",
  },
  {
    name: "aksel_blogg",
    title: "Bloggpost",
  },
  {
    name: "ds_artikkel",
    title: "Designsystem Artikkel",
    desc: "Atikkel som legges under designsystemet",
  },
  {
    name: "komponent_artikkel_template",
    title: "Designsystem Komponentside",
    desc: "Atikkel som legges under designsystemet",
  },
];

export default [
  ...docTypes.map((doct) =>
    S.initialValueTemplateItem(doct.name)
      .id(`doc-${doct.name}`)
      .title(doct.title)
      .templateId(doct.name)
      .description(doct?.desc ?? "")
  ),
  /* ...S.defaultInitialValueTemplateItems() */
];
