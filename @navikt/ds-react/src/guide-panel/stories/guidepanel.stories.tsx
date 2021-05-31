import React from "react";
import { GuidePanel } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/guidepanel",
  component: GuidePanel,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>GuidePanel</h1>
      <GuidePanel />
    </div>
  );
};
