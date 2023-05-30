import {
  Coronavirus,
  Edit,
  Hospital,
  Money,
  People,
  Vacation,
} from "@navikt/ds-icons";
import { Timeline } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [activePeriod, setActivePeriod] = useState<any>();

  return (
    <div className="min-w-[800px] overflow-x-auto">
      <Timeline>
        <Timeline.Row label="Person" icon={<People aria-hidden />}>
          {person.map((p: any, i) => {
            return (
              <Timeline.Period
                key={i}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
                onSelectPeriod={() => setActivePeriod(p.id)}
                isActive={activePeriod && activePeriod === p.id}
                aria-controls="timeline-panel"
                id={p.id}
              />
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Sykehus A" icon={<Hospital aria-hidden />}>
          {jobb.map((p: any, i) => {
            return (
              <Timeline.Period
                key={i}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
                onSelectPeriod={() => setActivePeriod(p.id)}
                isActive={activePeriod && activePeriod === p.id}
                aria-controls="timeline-panel"
                id={p.id}
              />
            );
          })}
        </Timeline.Row>
      </Timeline>
      {activePeriod && (
        <div
          aria-controls={activePeriod.id}
          id="timeline-panel"
          className="mt-8"
        >{`${activePeriod}: ${
          [...person, ...jobb].find((x) => x.id === activePeriod).start
        }`}</div>
      )}
    </div>
  );
};

const person = [
  {
    id: 1,
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <Edit aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: 2,
    start: new Date("Apr 1 2022"),
    end: new Date("Apr 30 2022"),
    status: "neutral",
    icon: <Vacation aria-hidden />,
    label: "test",
    statusLabel: "Ferie",
  },
  {
    id: 3,
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <Edit aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: 4,
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <Coronavirus aria-hidden />,
    statusLabel: "Stønad korona",
  },
];

const jobb = [
  {
    id: 5,
    start: new Date("Feb 2 2022"),
    end: new Date("Mar 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <Money aria-hidden />,
  },
  {
    id: 6,
    start: new Date("Mar 2 2022"),
    end: new Date("Apr 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <Money aria-hidden />,
  },
  {
    id: 7,
    start: new Date("May 2 2022"),
    end: new Date("June 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <Money aria-hidden />,
  },
  {
    id: 8,
    start: new Date("June 2 2022"),
    end: new Date("July 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <Money aria-hidden />,
  },
];

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "'onSelectPeriod' og 'isActive' lar deg velge aktive perioder for visning av ekstra informasjon en annen plass i UI.",
};

export const args = {
  index: 2,
};
