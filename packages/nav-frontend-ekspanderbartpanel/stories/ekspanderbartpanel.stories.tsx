import React from "react";
import Ekspanderbartpanel from "../src/index";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import Etikett from "nav-frontend-etiketter";

export const Main = () => (
  <>
    <h1>Ekspanderbartpanel</h1>
    <div>
      <h2>Normal</h2>
      <Ekspanderbartpanel tittel="Klikk her for å åpne/lukke panelet">
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </div>
    <div>
      <h2>Endre tekststørrelse</h2>
      <Ekspanderbartpanel
        tittel={<Normaltekst>Klikk her for å åpne/lukke panelet</Normaltekst>}
      >
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </div>
    <div>
      <h2>Avansert innhold i åpne/lukke-knapp</h2>
      <Ekspanderbartpanel
        tittel={
          <div>
            <Undertittel>Klikk her for å åpne/lukke panelet</Undertittel>
            <Etikett type="suksess">En etikett</Etikett>
            <Etikett type="fokus" style={{ marginLeft: "0.5rem" }}>
              En annen etikett
            </Etikett>
          </div>
        }
      >
        Panelet vil da ekspandere og vise innholdet.
      </Ekspanderbartpanel>
    </div>
  </>
);

export default {
  title: "Ekspanderbartpanel",
  component: Ekspanderbartpanel,
};
