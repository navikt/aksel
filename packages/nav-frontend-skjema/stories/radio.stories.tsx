import React from "react";
import { Radio, RadioGruppe } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/Radio",
  component: Radio,
} as Meta;

export const radio = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <Radio label={"Radio-label"} name="minRadioKnapp" />
      <Radio label={"Radio-label"} name="minRadioKnapp" disabled />
      <RadioGruppe legend="Hvor vil du sitte?">
        <Radio label={"Bakerst"} name="sitteplass" />
        <Radio label={"Midten"} name="sitteplass" />
        <Radio label={"Fremst"} name="sitteplass" />
      </RadioGruppe>
      <RadioGruppe legend="Hvor vil du sitte?" feil="Her er det noe feil">
        <Radio label={"Bakerst"} name="sitteplass" />
        <Radio label={"Midten"} name="sitteplass" />
        <Radio label={"Fremst"} name="sitteplass" />
      </RadioGruppe>
    </div>
  );
};
