import { Meta } from "@storybook/react";
import * as React from "react";
import Timeline from "./Timeline";

export default {
  title: "ds-react-internal/Timeline",
  component: Timeline,
  argTypes: {},
} as Meta;

export const Default = () => {
  return (
    <Timeline startDate={new Date("Jan 1 2022")} endDate={new Date()}>
      abc
    </Timeline>
  );
};
