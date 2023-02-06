import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Combobox } from "../../index";

export default {
  title: "ds-react/Combobox",
  component: Combobox,
} as Meta;

export const Default = (props) => {
  const [value, setValue] = useState("");
  return (
    <div data-theme={props.darkmode ? "dark" : "light"}>
      <Combobox
        value={props.controlled ? value : undefined}
        onChange={props.controlled ? setValue : undefined}
        label="komboboks"
        size="medium"
        clearButton={true}
        variant="primary"
        hideLabel={true}
        error={props.error && "error here"}
      />
    </div>
  );
};
