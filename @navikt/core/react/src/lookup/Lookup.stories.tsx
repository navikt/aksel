import React from "react";
import { Button } from "../button";
import { BodyLong } from "../typography";
import Lookup from "./Lookup";

export default {
  title: "ds-react/Lookup",
  component: Lookup,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default = () => {
  return <Lookup word="Lookup">Lookup component</Lookup>;
};

export const WithinASentence = () => {
  return (
    <BodyLong>
      This is an example of a <Lookup word="lookup">Lookup component</Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const VeryLongWord = () => {
  return (
    <div>
      <p>tekst tekst</p>
      <Button>test</Button>
      <BodyLong style={{ maxWidth: "300px" }}>
        This is an example of a{" "}
        <Lookup word="very very long lookup word that never stops">
          Lookup component
          <button>test</button>
        </Lookup>{" "}
        within a sentence.
      </BodyLong>
      <Button>test</Button>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
      <p>tekst tekst</p>
    </div>
  );
};

export const HoverEffect = () => {
  return (
    <BodyLong>
      This is an example of a{" "}
      <Lookup word="lookup word" UNSAFEhoverEffect={true}>
        Lookup component
      </Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};
