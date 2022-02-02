import React from "react";
import { TextField } from "../..";
import { HelpText } from "..";

export default {
  title: "ds-react/help-text",
  component: HelpText,
};

export const All = () => {
  return (
    <>
      <h1>HelpText</h1>
      <HelpText title="show tooltip">
        Id ullamco excepteur elit fugiat labore.
      </HelpText>
      <TextField
        label={
          <div style={{ display: "flex", gap: 8 }}>
            Text field label
            <HelpText title="show tooltip">
              Id ullamco excepteur elit fugiat labore.
            </HelpText>
          </div>
        }
      ></TextField>
    </>
  );
};
