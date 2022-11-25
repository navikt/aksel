import * as object from "./objects";
import * as document from "./documents";

export default {
  types: [
    /* Documents */
    document.Editors,
    document.Forside,
    document.Redirect,

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
