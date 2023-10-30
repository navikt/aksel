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
    document.Feedback,

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
    document.Tema,
    document.GodPraksisArtikkel,
    document.GodPraksisLandingSide,

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
    object.SEOFields,
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

    /* Prinsipper */
    object.HeroBilde,
    object.InnholdsKort,
  ],
};
