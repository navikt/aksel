import * as document from "./documents";
import * as object from "./objects";

export default {
  types: [
    /* Documents */
    document.Editors,
    document.Forside,
    document.Redirect,
    document.TestDoc,

    /* Objects */
    object.RelatertInnhold,
    object.Kode,
    object.SEOFields,
    object.Tabell,
    object.Bilde,
    object.DoDont,
    object.DoDontBlock,
    object.Video,

    /* Komponentsider */
    object.PropsSeksjon,
    /* object.KodeEksempler, */
    /* object.TastaturUU, */
    /* object.TokenTabell, */
    /* object.KomponentIntro, */

    /* Prinsipper */
    object.HeroBilde,
  ],
};
