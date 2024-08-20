import { SchemaPluginOptions } from "sanity";
import * as document from "./documents";
import * as object from "./objects";

export const schema: SchemaPluginOptions = {
  types: [
    /* Documents */
    document.Editors,
    document.Forside,
    document.Redirect,
    document.Skrivehjelp,
    document.Publiseringsflyt,
    document.ArticleViews,

    /* Komponentsider */
    document.KodeEksempelDoc,
    document.Tokens,
    document.Props,
    document.KomponentArtikkel,
    document.KomponentLandingSide,

    /* Grunnleggende */
    document.GrunnleggendeLandingSide,
    document.GrunnleggendeArtikkel,

    /* Møster og Maler */
    document.TemplatesLandingSide,
    document.TemplatesArtikkel,

    /* God-praksis */
    document.GodPraksisArtikkel,
    document.GodPraksisLandingSide,
    document.Tema,
    document.Undertema,
    document.Innholdstype,

    /* Blogg */
    document.Blogg,
    document.BloggLandingSide,

    /* Prinsipper */
    document.Prinsipp,
    document.PrinsipperLandingSide,

    /* Standalone */
    document.Standalone,

    /* Objects */
    object.RelatertInnhold,
    object.Kode,

    // @ts-expect-error - sanity-table does not correctly infer type for schema
    object.Tabell,
    object.Bilde,
    object.DoDont,
    object.DoDontBlock,
    object.Video,
    object.Accordion,
    object.Alert,
    object.ExpansionCard,
    object.Tips,
    object.UnikSidemodul,
    object.Attachment,

    /* Riktekst */
    object.RiktekstKomponent,
    object.RiktekstEnkel,
    object.RiktekstGrunnleggende,
    object.RiktekstTemplates,
    object.RiktekstStandard,
    object.RiktekstPrinsipp,
    object.RiktekstStandalone,
    object.RiktekstAccordion,

    /* Komponentsider */
    object.PropsSeksjon,
    object.KodeEksempler,
    object.TastaturUU,
    object.TokenTabell,
    object.KomponentIntro,

    /* Templatesider */
    object.ExampletextBlock,

    /* Prinsipper */
    object.HeroBilde,
    object.InnholdsKort,
  ],
  templates: [
    {
      id: "gp.tema.undertema.by.tema",
      title: "Undertema",
      schemaType: "gp.tema.undertema",
      parameters: [{ name: "id", type: "string" }],
      value: async (params) => {
        return {
          tema: { _type: "reference", _ref: params.id },
        };
      },
    },
    {
      id: "gp.artikkel.by.undertema",
      title: "God praksis aritkkel med undertema",
      schemaType: "aksel_artikkel",
      parameters: [{ name: "undertema_id", type: "string" }],
      value: (params) => ({
        undertema: [{ _type: "reference", _ref: params.undertema_id }],
      }),
    },
    {
      id: "gp.artikkel.by.innholdstype",
      title: "God praksis aritkkel med innholdstype",
      schemaType: "aksel_artikkel",
      parameters: [{ name: "id", type: "string" }],
      value: (params) => ({
        innholdstype: { _type: "reference", _ref: params.id },
      }),
    },
  ],
};
