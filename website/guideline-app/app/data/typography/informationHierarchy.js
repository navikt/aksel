import {
  Sidetittel,
  Normaltekst,
  Undertittel,
  Innholdstittel,
  Systemtittel,
  Ingress,
  Element,
  EtikettLiten,
} from "../../../../../packages/nav-frontend-typografi";

const informationHierarchyData = [
  { component: Sidetittel, content: "Sidetittel" },
  {
    component: Ingress,
    content: `Ingress. Da nå skrubben hadde ett opp hesten, tok Askeladden bikselet og bandt i kjeften på den, 
                og salen og la på ryggen av den, og nå var skrubben blitt så sterk av det den hadde fått i seg, at 
                den satte avsted med kongssønnen som ingen ting; så fort hadde han aldri ridd før.`,
  },
  { component: Innholdstittel, content: "Innholdstittel" },
  { component: Systemtittel, content: "Systemtittel" },
  { component: Undertittel, content: "Undertittel" },
  { component: Element, content: "Element" },
  {
    component: Normaltekst,
    content: `Normal. Fisken den tar av," sa han, med en stemme som trengte igjennom sagduren; "for slik en gullhake, 
                inte større enn den der, er det rart å få nå. Men sagflisa den tar tel år for år, og en kan inte undres 
                over at fisken inte går ut i elva; for lukker 'n på kjeften og skal ta en svelg reint vatn, så får 'n 
                hele kroen full ta sagflis og mukker. Den fordømte sagflisa! - Gud forlate meg mi synd like væl - det 
                er saga som gir oss brød, både meg og mine. Men je blir så arg, når jeg tenker på de svære kolvene je 
                har dradd her i gamle.`,
  },
  { component: Undertittel, content: "Undertittel" },
  { component: Element, content: "Element" },
  {
    component: Normaltekst,
    content: `Normal. Fisken den tar av," sa han, med en stemme som trengte igjennom sagduren; "for slik en gullhake, 
                inte større enn den der, er det rart å få nå. Men sagflisa den tar tel år for år, og en kan inte undres 
                over at fisken inte går ut i elva; for lukker 'n på kjeften og skal ta en svelg reint vatn, så får 'n 
                hele kroen full ta sagflis og mukker. Den fordømte sagflisa! - Gud forlate meg mi synd like væl - det 
                er saga som gir oss brød, både meg og mine. Men je blir så arg, når jeg tenker på de svære kolvene je 
                har dradd her i gamle.`,
  },
  { component: EtikettLiten, content: "Etikett Liten" },
  {
    component: Normaltekst,
    content: "Normal. Da nå skrubben hadde ett opp hesten",
  },
];

export default informationHierarchyData;
