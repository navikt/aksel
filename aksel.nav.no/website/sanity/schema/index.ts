import * as document from "./documents";
import * as object from "./objects";

export default {
  types: [
    /* Documents */
    document.Editors,
    document.Forside,
    document.Redirect,
    document.TestDoc,

    /* Komponentsider */
    document.KodeEksempelDoc,
    document.Tokens,
    document.Props,
    document.KomponentArtikkel,
    document.Tema,
    document.GodPraksisArtikkel,

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
    object.Tips,
    object.UnikSidemodul,

    /* Riktekst */
    object.RiktekstKomponent,
    object.RiktekstAksel,
    object.RiktekstEnkel,

    /* Komponentsider */
    object.PropsSeksjon,
    object.KodeEksempler,
    object.TastaturUU,
    object.TokenTabell,
    object.KomponentIntro,

    /* Prinsipper */
    object.HeroBilde,
  ],
};
