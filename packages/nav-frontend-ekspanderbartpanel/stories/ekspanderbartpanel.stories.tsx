import React, { useState } from "react";
import Ekspanderbartpanel from "../src/index";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import Etikett from "nav-frontend-etiketter";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Ekspanderbartpanel",
  component: Ekspanderbartpanel,
} as Meta;

export const All = () => (
  <div
    style={{
      display: "grid",
      gridAutoRows: "auto",
      rowGap: "2rem",
      gridAutoColumns: "fit-content",
    }}
  >
    <Ekspanderbartpanel tittel="Default, klikk her for å åpne/lukke panelet">
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>

    <Ekspanderbartpanel
      tittel={
        <Normaltekst>
          Endret tekststørrelse, klikk her for å åpne/lukke panelet
        </Normaltekst>
      }
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>

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

    <Ekspanderbartpanel tittel="Nøstede ekspanderbartpaneler, klikk her for å åpne/lukke panelet">
      Panelet vil da ekspandere og vise innholdet.
      <Ekspanderbartpanel tittel="Klikk her for å åpne/lukke panelet">
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </Ekspanderbartpanel>

    <Ekspanderbartpanel
      apen
      tittel="Default apen, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>

    <Ekspanderbartpanel
      apen
      tittel="Nøstede ekspanderbartpaneler apen, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
      <Ekspanderbartpanel apen tittel="Klikk her for å åpne/lukke panelet">
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </Ekspanderbartpanel>

    <Ekspanderbartpanel
      border={false}
      tittel="Uten border, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>

    <Ekspanderbartpanel
      border={false}
      apen
      tittel="Uten border apen, klikk her for å åpne/lukke panelet"
    >
      Panelet vil da ekspandere og vise innholdet.
    </Ekspanderbartpanel>
  </div>
);

export const Controlled = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button onClick={() => setOpen((open) => !open)}>Toggle</button>
      <Ekspanderbartpanel
        tittel="Default, klikk her for å åpne/lukke panelet"
        apen={open}
      >
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </>
  );
};
