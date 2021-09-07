import React from "react";
import { MicroCard } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react-navno/card",
  component: MicroCard,
} as Meta;

export const All = () => {
  return (
    <div>
      <h2>MicroCard</h2>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
    </div>
  );
};
