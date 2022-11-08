import { SuccessFilled } from "@navikt/ds-icons";
import { useState } from "@storybook/addons";
import { Meta } from "@storybook/react";
import * as React from "react";
import Timeline from "./Timeline";

export default {
  title: "ds-react-internal/Timeline",
  component: Timeline,
  argTypes: {},
} as Meta;

const DummyLabel = () => {
  return (
    <div
      style={{
        width: "239px",
        margin: 0,
        textAlign: "left",
        fontSize: "14px",
      }}
    >
      <p>Periode: 15.07.2019 - 25.07.2019</p>
      <p>Utbetalt: 12 345,00 kr</p>
      <p style={{ color: "red" }}>Dager igjen: 0</p>
    </div>
  );
};

const row1 = [
  {
    id: "1",
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "success",
    icon: <SuccessFilled aria-hidden />,
  },
  {
    id: "2",
    start: new Date("Feb 1 2022"),
    end: new Date("Mar 15 2022"),
    status: "danger",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
  },
  {
    id: "3",
    start: new Date("May 2 2022"),
    end: new Date("May 25 2022"),
    status: "success",
    icon: <SuccessFilled aria-hidden />,
  },
  {
    id: "4",
    start: new Date("Mar 1 2022"),
    end: new Date("Mar 31 2022"),
    status: "success",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <SuccessFilled aria-hidden />,
  },
  {
    id: "5",
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <SuccessFilled aria-hidden />,
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
  },
  {
    id: "6",
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <SuccessFilled aria-hidden />,
  },
];

const row2 = [
  {
    id: "7",
    start: new Date("May 13 2022"),
    end: new Date("May 25 2022"),
    status: "warning",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <SuccessFilled aria-hidden />,
    children: <DummyLabel />,
  },
  {
    id: "8",
    start: new Date("Feb 1 2022"),
    end: new Date("May 2 2022"),
    status: "neutral",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <SuccessFilled aria-hidden />,
    children: <DummyLabel />,
  },
];

export const Default = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Row label="Row 1" icon={<SuccessFilled aria-hidden />}>
          {row1.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
              />
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Row 2" icon={<SuccessFilled aria-hidden />}>
          {row2.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
              />
            );
          })}
        </Timeline.Row>
      </Timeline>
    </div>
  );
};

export const WithPins = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Pin date={new Date("Apr 15 2022")}>Pin 1</Timeline.Pin>
        <Timeline.Pin date={new Date("Jun 12 2022")}>Pin 2</Timeline.Pin>
        <Timeline.Pin date={new Date("Jul 28 2022")}>Pin 3</Timeline.Pin>
        <Timeline.Row label="Row 1" icon={<SuccessFilled aria-hidden />}>
          {row1.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
              />
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Row 2" icon={<SuccessFilled aria-hidden />}>
          {row2.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
              />
            );
          })}
        </Timeline.Row>
      </Timeline>
    </div>
  );
};

export const WithZoom = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Row label="Row 1" icon={<SuccessFilled aria-hidden />}>
          {row1.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
              />
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Row 2" icon={<SuccessFilled aria-hidden />}>
          {row2.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
              />
            );
          })}
        </Timeline.Row>
        <Timeline.ZoomButton label="3 mnd" interval="month" count={3} />
        <Timeline.ZoomButton label="7 mnd" interval="month" count={7} />
        <Timeline.ZoomButton label="9 mnd" interval="month" count={9} />
      </Timeline>
    </div>
  );
};

export const ActivePeriod = () => {
  const [activePeriod, setActivePeriod] = useState(row1[0]);
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Pin date={new Date("Apr 15 2022")}>Pin 1</Timeline.Pin>
        <Timeline.Pin date={new Date("Jun 12 2022")}>Pin 2</Timeline.Pin>
        <Timeline.Pin date={new Date("Jul 28 2022")}>Pin 3</Timeline.Pin>
        <Timeline.Row label="Row 1" icon={<SuccessFilled aria-hidden />}>
          {row1.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                onSelectPeriod={() => {
                  setActivePeriod(p);
                  p?.onSelectPeriod?.();
                }}
                icon={p.icon}
                isActive={activePeriod.id === p.id}
              >
                {p.children}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Navn på rad">
          {row2.map((p: any, i) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                onSelectPeriod={() => {
                  setActivePeriod(p);
                  p?.onSelectPeriod?.();
                }}
                icon={p.icon}
                isActive={activePeriod.id === p.id}
              >
                {p.children}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row>
          <Timeline.Period
            start={new Date("Jan 1 2022")}
            end={new Date("Aug 20 2022")}
            status="information"
            icon={<SuccessFilled aria-hidden />}
          />
        </Timeline.Row>
      </Timeline>
    </div>
  );
};
