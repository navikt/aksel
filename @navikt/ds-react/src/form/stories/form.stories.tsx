import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextInput } from "../..";
export default {
  title: "ds-react/form",
} as Meta;

export const All = () => {
  return (
    <form>
      <TextInput />
    </form>
  );
};
