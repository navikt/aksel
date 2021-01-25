import React from "react";
import {
  Sidetittel,
  Innholdstittel,
  Systemtittel,
  Undertittel,
  Ingress,
  Undertekst,
  Element,
  Feilmelding,
  Normaltekst,
  UndertekstBold,
} from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Typografi",
  component: Sidetittel,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "4rem", rowGap: "0rem" }}>
      <Sidetittel>Sidetittel</Sidetittel>
      <Innholdstittel>Innholdstittel</Innholdstittel>
      <Systemtittel>Systemtittel</Systemtittel>
      <Undertittel>Undertittel</Undertittel>
      <Ingress>Ingress</Ingress>
      <Element>Element</Element>
      <Feilmelding>Feilmelding</Feilmelding>
      <Normaltekst>Normaltekst</Normaltekst>
      <Undertekst>Undertekst</Undertekst>
      <UndertekstBold>UndertekstBold</UndertekstBold>
    </div>
  );
};
