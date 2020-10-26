import React from "react";
import Ekspanderbartpanel from "../src/index";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import Etikett from "nav-frontend-etiketter";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Ekspanderbartpanel/All",
  component: Ekspanderbartpanel,
} as Meta;

export const All = () => (
  <>
    <Ekspanderbartpanel tittel="Default, klikk her for å åpne/lukke panelet">
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel
      tittel={
        <Normaltekst>
          Endret tekststørrelse, klikk her for å åpne/lukke panelet
        </Normaltekst>
      }
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel
      tittel={
        <div>
          <Undertittel>
            Avansert innhold i tittel, klikk her for å åpne/lukke panelet
          </Undertittel>
          <Etikett type="suksess">En etikett</Etikett>
          <Etikett type="fokus" style={{ marginLeft: "0.5rem" }}>
            En annen etikett
          </Etikett>
        </div>
      }
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel tittel="Nøstede ekspanderbartpaneler, klikk her for å åpne/lukke panelet">
      Panelet vil da ekspandere og vise innholdet.
      <Ekspanderbartpanel tittel="Klikk her for å åpne/lukke panelet">
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel
      apen
      tittel="Default apen, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel
      apen
      tittel="Nøstede ekspanderbartpaneler apen, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
      <Ekspanderbartpanel apen tittel="Klikk her for å åpne/lukke panelet">
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel
      border={false}
      tittel="Uten border, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
    <br />
    <Ekspanderbartpanel
      border={false}
      apen
      tittel="Uten border apen, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
  </>
);
