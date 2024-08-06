import { Meta } from "@storybook/react";
import React from "react";
import { Time } from "./Time";

export default {
  title: "ds-react/Time",
  component: Time,
} satisfies Meta<typeof Time>;

export const Default = () => {
  return <Time date={new Date()} />;
};

export const Day = () => {
  return <Time date={new Date()} day />;
};

export const Month = () => {
  return <Time date={new Date()} month />;
};

export const OnlyTime = () => {
  return <Time date={new Date()} onlyTime />;
};
