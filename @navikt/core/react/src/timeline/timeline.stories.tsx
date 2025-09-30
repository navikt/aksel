import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import { Provider } from "../provider";
import en from "../util/i18n/locales/en";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";
import Timeline, { type TimelineProps } from "./Timeline";
import type { PeriodProps } from "./period/types";

export default {
  title: "ds-react/Timeline",
  component: Timeline,
  parameters: { chromatic: { disable: true } },
} satisfies Meta<typeof Timeline>;

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

type ExamplePeriod = Pick<
  PeriodProps,
  "start" | "end" | "status" | "icon" | "statusLabel" | "children"
> & { id: string; onSelectPeriod?: () => void; label?: string };

const row1: ExamplePeriod[] = [
  {
    id: "1",
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "success",
    icon: <CheckmarkCircleFillIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "2",
    start: new Date("Feb 1 2022"),
    end: new Date("Mar 15 2022"),
    status: "danger",
    onSelectPeriod: () => console.info("PERIOD SELECTED!"),
    icon: <XMarkOctagonFillIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "3",
    start: new Date("May 2 2022"),
    end: new Date("May 25 2022"),
    status: "success",
    icon: <CheckmarkCircleFillIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "4",
    start: new Date("Mar 1 2022"),
    end: new Date("Mar 31 2022"),
    status: "success",
    onSelectPeriod: () => console.info("PERIOD SELECTED!"),
    icon: <CheckmarkCircleFillIcon aria-hidden />,
    label: "test",
    statusLabel: "Sykemeldt",
  },
  {
    id: "5",
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <ExclamationmarkTriangleFillIcon aria-hidden />,
    onSelectPeriod: () => console.info("PERIOD SELECTED!"),
    statusLabel: "Sykemeldt",
  },
  {
    id: "6",
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <ExclamationmarkTriangleFillIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
];

const row2: ExamplePeriod[] = [
  {
    id: "7",
    start: new Date("May 13 2022"),
    end: new Date("May 25 2022"),
    status: "warning",
    onSelectPeriod: () => console.info("PERIOD SELECTED!"),
    icon: <ExclamationmarkTriangleFillIcon aria-hidden />,
    children: <DummyLabel />,
  },
  {
    id: "8",
    start: new Date("Feb 1 2022"),
    end: new Date("May 2 2022"),
    status: "neutral",
    onSelectPeriod: () => console.info("PERIOD SELECTED!"),
    icon: <CheckmarkCircleFillIcon aria-hidden />,
    children: <DummyLabel />,
  },
];

const DefaultStoryComponent = (props: Pick<TimelineProps, "direction">) => (
  <div style={{ width: "80vw" }}>
    <Timeline {...props}>
      <Timeline.Row
        label="Row 1"
        icon={<CheckmarkCircleFillIcon aria-hidden />}
      >
        {row1.map((p) => {
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
      <Timeline.Row
        label="Row 2"
        icon={<CheckmarkCircleFillIcon aria-hidden />}
      >
        {row2.map((p) => {
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

export const Default: StoryFn<typeof Timeline> = (props) => (
  <DefaultStoryComponent {...props} />
);
Default.argTypes = {
  direction: {
    options: ["left", "right"],
    control: { type: "select" },
  },
};

export const English: StoryFn = () => {
  return (
    <Provider locale={en}>
      <DefaultStoryComponent />
    </Provider>
  );
};

export const WithPins: StoryFn = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Pin date={new Date("Apr 15 2022")}>Pin 1</Timeline.Pin>
        <Timeline.Pin date={new Date("Jun 12 2022")}>Pin 2</Timeline.Pin>
        <Timeline.Pin date={new Date("Jul 28 2022")}>Pin 3</Timeline.Pin>
        <Timeline.Row
          label="Row 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row1.map((p) => {
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
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row2.map((p) => {
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
      <div style={{ height: "6rem" }} />
      <Timeline>
        <Timeline.Pin date={new Date("Apr 15 2022")}>Pin 1</Timeline.Pin>
        <Timeline.Pin date={new Date("Jun 12 2022")}>Pin 2</Timeline.Pin>
        <Timeline.Pin date={new Date("Jul 28 2022")}>Pin 3</Timeline.Pin>
        <Timeline.Row
          label="Row 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row1.map((p) => {
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
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row2.map((p) => {
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
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row2.map((p) => {
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
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row2.map((p) => {
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

export const WithZoom: StoryFn = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Row
          label="Row 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row1.map((p) => {
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
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row2.map((p) => {
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
        <Timeline.Zoom>
          <Timeline.Zoom.Button label="3 mnd" interval="month" count={3} />
          <Timeline.Zoom.Button label="7 mnd" interval="month" count={7} />
          <Timeline.Zoom.Button label="9 mnd" interval="month" count={9} />
        </Timeline.Zoom>
      </Timeline>
      <div style={{ clear: "right" }} />
    </div>
  );
};

export const ActivePeriod: StoryFn = () => {
  const [activePeriod, setActivePeriod] = useState(row1[0]);

  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Pin date={new Date("Apr 15 2022")}>Pin 1</Timeline.Pin>
        <Timeline.Pin date={new Date("Jun 12 2022")}>Pin 2</Timeline.Pin>
        <Timeline.Pin date={new Date("Jul 28 2022")}>Pin 3</Timeline.Pin>
        <Timeline.Row
          label="Rad 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row1.map((p) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                onSelectPeriod={() => {
                  setActivePeriod(p);
                  p?.onSelectPeriod?.();
                  console.info("PERIOD SELECTED!");
                }}
                icon={p.icon}
                isActive={activePeriod.id === p.id}
                statusLabel={p.statusLabel}
              >
                {p.children}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Rad 2">
          {row2.map((p) => {
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
                statusLabel={p.statusLabel}
              >
                {p.children}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Rad 3">
          <Timeline.Period
            start={new Date("Jan 1 2022")}
            end={new Date("Aug 20 2022")}
            status="info"
            icon={<CheckmarkCircleFillIcon aria-hidden />}
            placement="bottom"
          />
        </Timeline.Row>
      </Timeline>
    </div>
  );
};

export const WithDayLabels: StoryFn = () => {
  const component = (
    <Timeline>
      <Timeline.Row
        label="Row 1"
        icon={<CheckmarkCircleFillIcon aria-hidden />}
      >
        <Timeline.Period
          start={new Date("Feb 4 2022")}
          end={new Date("Feb 13 2022")}
          status="success"
        />
      </Timeline.Row>
      <Timeline.Row
        label="Row 2"
        icon={<CheckmarkCircleFillIcon aria-hidden />}
      >
        <Timeline.Period
          start={new Date("Feb 17 2022")}
          end={new Date("Feb 22 2022")}
          status="warning"
        />
      </Timeline.Row>
    </Timeline>
  );

  return (
    <VStack gap="8" width="80vw">
      {component}

      <div>
        <h3>EN:</h3>
        <Provider locale={en}>{component}</Provider>
      </div>
    </VStack>
  );
};

export const WithYearLabels: StoryFn = () => {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Row
          label="Row 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          <Timeline.Period
            start={new Date("Feb 4 2022")}
            end={new Date("Feb 13 2028")}
            status="success"
          />
        </Timeline.Row>
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          <Timeline.Period
            start={new Date("Feb 17 2024")}
            end={new Date("Feb 22 2031")}
            status="warning"
          />
        </Timeline.Row>
      </Timeline>
    </div>
  );
};

export const ContentDemo: StoryFn = () => {
  const [activePeriod, setActivePeriod] = useState<ExamplePeriod>();

  return (
    <div style={{ width: "80vw" }}>
      <Timeline>
        <Timeline.Pin date={new Date("Apr 15 2022")}>Pin 1</Timeline.Pin>
        <Timeline.Pin date={new Date("Jun 12 2022")}>
          Pin 2 <button>test</button>
          <a href="/123">test123123</a>
        </Timeline.Pin>
        <Timeline.Pin date={new Date("Jul 28 2022")}>Pin 3</Timeline.Pin>
        <Timeline.Row
          label="Rad 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          {row1.map((p) => {
            return (
              <Timeline.Period
                key={p.id}
                start={p.start}
                end={p.end}
                status={p.status}
                onSelectPeriod={() => {
                  setActivePeriod(p);
                  p?.onSelectPeriod?.();
                  console.info("PERIOD SELECTED!");
                }}
                icon={p.icon}
                isActive={activePeriod?.id === p.id}
                statusLabel={p.statusLabel}
                aria-controls={
                  activePeriod?.id === p.id ? "timeline-data" : undefined
                }
                id={p.id}
              >
                {p.children}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Rad 2">
          {row2.map((p) => {
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
                isActive={activePeriod?.id === p.id}
                statusLabel={p.statusLabel}
                aria-controls={
                  activePeriod?.id === p.id ? "timeline-data" : undefined
                }
                id={p.id}
              >
                {p.children}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Rad 3">
          <Timeline.Period
            start={new Date("Jan 1 2022")}
            end={new Date("Aug 20 2022")}
            status="info"
            icon={<CheckmarkCircleFillIcon aria-hidden />}
          />
        </Timeline.Row>
      </Timeline>
      {activePeriod && (
        <div id="timeline-data" aria-controls={activePeriod.id}>
          <h2>Period-data</h2>
          <p>{`Periode:${activePeriod.id}, dato:${activePeriod.start}`}</p>
        </div>
      )}
    </div>
  );
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  English,
  WithPins,
  WithZoom,
  ActivePeriod,
  WithDayLabels,
  WithYearLabels,
});
