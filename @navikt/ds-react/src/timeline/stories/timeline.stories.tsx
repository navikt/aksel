import React from "react";
import { Timeline } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/timeline",
  component: Timeline,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Timeline</h1>
      <Timeline>Tidslinje</Timeline>
    </div>
  );
};
