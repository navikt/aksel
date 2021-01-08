import React, { createRef, useRef } from "react";
import { RadioPanel, RadioPanelGruppe } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Skjema",
  component: RadioPanel,
} as Meta;

export const radioPanel = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <RadioPanelGruppe
        name="samplename"
        legend="Hvilken drikke er best?"
        radios={[
          {
            label: "Eplejuice",
            value: "juice1",
            id: "juice1id",
            checked: true,
          },
          {
            label: "Appelsinjuice",
            value: "juice2",
            id: "juice2id",
          },
          { label: "Melk", value: "melk", disabled: true, id: "melkid" },
          { label: "Ananasjuice", value: "juice3", id: "juice4id" },
        ]}
        onChange={() => null}
      />
      <RadioPanelGruppe
        name="samplename"
        legend="Hvilken drikke er best?"
        description="beskrivelse av felter"
        radios={[
          { label: "Eplejuice", value: "juice1", id: "juice1id" },
          { label: "Appelsinjuice", value: "juice2", id: "juice2id" },
          { label: "Melk", value: "melk", disabled: true, id: "melkid" },
          {
            label: "Ananasjuice",
            value: "juice3",
            id: "juice4id",
            checked: true,
          },
        ]}
        onChange={() => null}
        feil={"Her er det en feil."}
      />
    </div>
  );
};
