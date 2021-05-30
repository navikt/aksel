import React from "react";
import { Guide } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/guide",
  component: Guide,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Guide</h1>
      <Guide />
    </div>
  );
};
