import Accordion from "./accordion";
import Alert from "./alert";
import Innholdskort from "./innholdskort";
import Bilde from "./bilde";
import DoDont, { doDontBlock } from "./do-dont";
import HeroBilde from "./hero-bilde";
import introKomponent from "./intro-komponent";
import Kode from "./kode";
import KodeEksempler from "./kode-eksempler";
import Props from "./props";
import RelatertInnhold from "./relatert-innhold";
import { tmpTabell, tmpTabellRow } from "./tabellv2";
import {
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstEnkel,
  RiktekstKomponent,
  RiktekstPrinsipp,
  RiktekstTabell,
} from "./riktekst";
import SpesialSeksjon from "./spesial-seksjon";
import Tastatur from "./tastatur";
import Tips from "./tips";
import TokenRef from "./token-tabell";
import Video from "./video";

const v2Blocks = [
  tmpTabell,
  tmpTabellRow,
  /* Blocks */
  RiktekstEnkel,
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstKomponent,
  RiktekstTabell,
  RiktekstPrinsipp,

  /* Moduler */
  /* Tabellv2, */
  DoDont,
  doDontBlock,
  Bilde,
  HeroBilde,
  Alert,
  Kode,
  RelatertInnhold,
  Innholdskort,
  introKomponent,
  Props,
  Accordion,
  SpesialSeksjon,
  Video,
  Tips,
  Tastatur,
  KodeEksempler,
  TokenRef,
];

export default v2Blocks;
