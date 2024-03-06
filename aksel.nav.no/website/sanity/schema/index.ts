import { SchemaPluginOptions } from "sanity";
import innholdsType from "../plugins/god-praksis-taxonomy/documents/innholdstype";
import tema from "../plugins/god-praksis-taxonomy/documents/tema";
import undertema from "../plugins/god-praksis-taxonomy/documents/undertema";
import * as document from "./documents";
import * as object from "./objects";
import { WorkspaceT } from "./util";

export const schema: (workspace: WorkspaceT) => SchemaPluginOptions = (
  workspace,
) => ({
  types: [
    /**
     * Ny struktur for god praksis
     */
    tema,
    undertema,
    innholdsType,

    /* Documents */
    document.Editors,
    document.Forside,
    document.Redirect,
    document.Skrivehjelp,
    document.Publiseringsflyt,
    document.Feedback,
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
    document.Tema,
    document.godPraksisArtikkel(workspace),
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
});
