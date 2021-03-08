import React from "react";
import { CheckboksPanel, CheckboksPanelGruppe } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/CheckboksPanel",
  component: CheckboksPanel,
} as Meta;

export const checkboksPanel = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <CheckboksPanel label={"Checkbox"} />
      <CheckboksPanelGruppe
        legend={"Velg en eller flere:"}
        description="Beskrivelse av felt"
        checkboxes={[
          { label: "Eplejuice", value: "juice1", id: "juice1id" },
          { label: "Appelsinjuice", value: "juice2", id: "juice2id" },
          { label: "Melk", value: "melk", disabled: true, id: "melkid" },
          {
            label: "Ananasjuice",
            value: "juice3",
            id: "juice4id",
            subtext: "Subtext example",
          },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};
