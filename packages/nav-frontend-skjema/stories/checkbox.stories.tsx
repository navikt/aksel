import React from "react";
import { Checkbox, CheckboxGruppe } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/Checkbox",
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
      <Checkbox label={"Standard Checkbox"} />
      <Checkbox disabled label={"Disabled Checkbox"} />
      <Checkbox label={"Feil Checkbox"} feil="Her er det noe feil" />
      <Checkbox label={"Feil Checkbox"} feil="Her er det noe feil" disabled />

      <CheckboxGruppe legend="CheckboxGruppe legend">
        <Checkbox label={"Bakerst"} />
        <Checkbox label={"Midten"} />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>

      <CheckboxGruppe
        legend="CheckboxGruppe med feil legend"
        feil="Her er det noe feil"
      >
        <Checkbox label={"Bakerst"} />
        <Checkbox label={"Midten"} />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>

      <CheckboxGruppe
        legend="CheckboxGruppe med feil legend"
        feil="Her er det noe feil"
      >
        <Checkbox label={"Bakerst"} />
        <Checkbox label={"Midten"} disabled />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>

      <CheckboxGruppe
        legend="CheckboxGruppe med feil utenFeilPropagering legend"
        feil="Her er det noe feil"
        utenFeilPropagering
      >
        <Checkbox label={"Bakerst"} disabled />
        <Checkbox label={"Midten"} feil />
        <Checkbox label={"Fremst"} />
      </CheckboxGruppe>
    </div>
  );
};
