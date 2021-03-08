import React, { useState } from "react";
import { TextareaControlled, Textarea } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/TextareaControlled",
  component: TextareaControlled,
} as Meta;

export const Textarea_Controlled = () => {
  const [txt, setTxt] = useState("");
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <Textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        label="Textarea-label"
      />
      <Textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        label="Textarea-label"
        maxLength={0}
      />
      <Textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        label="Textarea-label"
        feil="Her er det noe feil."
      />
      <Textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        label="Textarea-label"
        description="Beskriv kort din situasjon"
      />
    </div>
  );
};
