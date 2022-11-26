import Accordion from "./migrated/accordion";
import Alert from "./migrated/alert";
import Innholdskort from "./innholdskort";
import Bilde from "./migrated/bilde";
import DoDont, { doDontBlock } from "./migrated/do-dont";
import HeroBilde from "./migrated/hero-bilde";
import introKomponent from "./migrated/intro-komponent";
import Kode from "./migrated/kode";
import KodeEksempler from "./migrated/kode-eksempler";
import Props from "./migrated/props";
import RelatertInnhold from "./migrated/relatert-innhold";
import { tmpTabell, tmpTabellRow } from "./migrated/tabellv2";
import {
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstEnkel,
  RiktekstKomponent,
  RiktekstPrinsipp,
  RiktekstTabell,
} from "./migrated/riktekst";
import SpesialSeksjon from "./migrated/spesial-seksjon";
import Tastatur from "./migrated/tastatur";
import Tips from "./migrated/tips";
import TokenRef from "./migrated/token-tabell";
import Video from "./migrated/video";

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
