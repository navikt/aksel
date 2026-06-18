import React from "react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Link } from "../link";
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
  return (
    <Lookup word="Lookup" title="«Lookup»">
      A text explanation of the lookup word. This is an example of a lookup
      component.
    </Lookup>
  );
};

export const WithinASentence = () => {
  return (
    <BodyLong>
      This is an example of a{" "}
      <Lookup word="lookup" title="Lookup word">
        A text explanation of the lookup word.
      </Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const WithLink = () => {
  return (
    <BodyLong>
      This is an example of a{" "}
      <Lookup word="lookup word" title="Lookup word">
        <BodyLong>A longer text that explains the lookup word.</BodyLong>
        <Link href="https://www.nav.no" target="_blank">
          See further details <ExternalLinkIcon />
        </Link>
      </Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const VeryLongWord = () => {
  return (
    <BodyLong style={{ maxWidth: "400px" }}>
      This is an example of a{" "}
      <Lookup
        word="lookup word that is very very long and it never stops and keeps going"
        title="Lookup word"
      >
        <BodyLong>A longer text that explains the lookup word.</BodyLong>
      </Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const ButtonsBeforeAndAfter = () => {
  return (
    <div>
      <button>Before button</button>
      <BodyLong>
        This is an example of a{" "}
        <Lookup word="lookup word" title="Lookup word">
          <BodyLong>A longer text that explains the lookup word.</BodyLong>
        </Lookup>{" "}
        within a sentence.
      </BodyLong>
      <button>After button</button>
    </div>
  );
};
