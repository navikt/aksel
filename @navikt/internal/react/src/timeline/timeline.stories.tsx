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
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Row label="Row 1">
          <Timeline.Period start={new Date("Feb 2 2022")} end={new Date()} />
          <Timeline.Period
            start={new Date("May 2 2022")}
            end={new Date("Dec 1 2022")}
          />
        </Timeline.Row>
        <Timeline.Row label="Row 2">
          <Timeline.Period
            start={new Date("May 2 2001")}
            end={new Date("Dec 1 2028")}
          />
          <Timeline.Period
            start={new Date("May 2 1994")}
            end={new Date("Dec 1 2022")}
          />
        </Timeline.Row>
        <Timeline.Row label="Row 3" />
      </Timeline>
    </div>
  );
};

export const PG = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Row label="Row 1">
          <Timeline.Period
            start={new Date("May 2 2022")}
            end={new Date("May 28 1 2022")}
          />
        </Timeline.Row>
      </Timeline>
    </div>
  );
};
