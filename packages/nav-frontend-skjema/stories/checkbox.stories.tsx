import React from "react";
import { Checkbox, CheckboxGruppe } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Skjema",
  component: Checkbox,
} as Meta;

export const checkbox = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <Checkbox label={"Checkbox"} />
      <Checkbox disabled label={"Checkbox"} />
      <Checkbox label={"Checkbox"} feil="Her er det noe feil" />
      <CheckboxGruppe legend="Hvor vil du sitte?">
        <Checkbox label={"Bakerst"} />
        <Checkbox label={"Midten"} />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>
      <CheckboxGruppe legend="Hvor vil du sitte?" feil="Her er det noe feil">
        <Checkbox label={"Bakerst"} />
        <Checkbox label={"Midten"} />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>
      <CheckboxGruppe
        legend="Hvor vil du sitte?"
        feil="Her er det noe feil"
        utenFeilPropagering
      >
        <Checkbox label={"Bakerst"} />
        <Checkbox label={"Midten"} feil />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>
    </div>
  );
};
