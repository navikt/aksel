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
      <Timeline.Row label="Row 1">
        <Timeline.Period start={new Date("Feb 2 2022")} end={new Date()} />
        <Timeline.Period
          start={new Date("May 2 2022")}
          end={new Date("Dec 1 2022")}
        />
      </Timeline.Row>
      <Timeline.Row label="Row 2" />
      <Timeline.Row label="Row 3" />
      <Timeline.Row />
    </Timeline>
  );
};
