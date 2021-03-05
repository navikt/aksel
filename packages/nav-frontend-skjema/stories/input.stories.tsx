import React from "react";
import { Input } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/Input",
  component: Input,
} as Meta;

export const input = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <Input />
      <Input label="Mitt skjemafelt:" />
      <Input
        label="Mitt skjemafelt:"
        description="En kort beskrivelse av feltet"
      />
      <Input label="Mini" mini />

      <Input label="Inputfelt-label" feil="Her er det noe feil" />
      <Input label={"Fullbredde inputfelt:"} bredde="fullbredde" />
      <Input label={"XXL inputfelt"} bredde="XXL" />
      <Input label={"XL inputfelt"} bredde="XL" />
      <Input label={"L inputfelt"} bredde="L" />
      <Input label={"M inputfelt"} bredde="M" />
      <Input label={"S inputfelt"} bredde="S" />
      <Input label={"XS inputfelt"} bredde="XS" />
      <Input label={"XXS inputfelt"} bredde="XXS" />
    </div>
  );
};
