import Accordion from "./accordion";
import Alert from "./alert";
import Bilde from "./bilde";
import HeroBilde from "./hero-bilde";
import DoDont, { doDontBlock } from "./do-dont";
import introKomponent from "./intro-komponent";
import Kode from "./kode";
import Props from "./props";
import RelatertInnhold from "./relatert-innhold";
import Innholdskort from "./innholdskort";
import KodeEksempler from "./kode-eksempler";
import TokenRef from "./token-tabell";
import {
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstEnkel,
  RiktekstKomponent,
  RiktekstTabell,
  RiktekstPrinsipp,
} from "./riktekst";
import SpesialSeksjon from "./spesial-seksjon";
import Tabell, { TabellSchema } from "./tabell";
import Tastatur from "./tastatur";
import Tips from "./tips";
import Tokens from "./tokens";
import Video from "./video";

const v2Blocks = [
  /* Blocks */
  RiktekstEnkel,
  RiktekstAksel,
  RiktekstDsArtikkel,
  RiktekstKomponent,
  RiktekstTabell,
  RiktekstPrinsipp,

  /* Moduler */
  DoDont,
  doDontBlock,
  Bilde,
  HeroBilde,
  Alert,
  Kode,
  RelatertInnhold,
  Innholdskort,
  introKomponent,
  Tabell,
  ...TabellSchema,
  Props,
  Accordion,
  SpesialSeksjon,
  Video,
  Tokens,
  Tips,
  Tastatur,
  KodeEksempler,
  TokenRef,
];

export default v2Blocks;
