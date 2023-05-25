import {
  VirusIcon,
  PencilIcon,
  HospitalIcon,
  PiggybankIcon,
  PersonGroupIcon,
  ParasolBeachIcon,
} from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [activePeriod, setActivePeriod] = useState<any>();

  return (
    <div className="min-w-[800px] overflow-x-auto">
      <Timeline>
        <Timeline.Pin date={new Date("Mar 15 2022")}>
          <p>Utbetalt: 12 345 kr</p>
        </Timeline.Pin>
        <Timeline.Row label="Person" icon={<PersonGroupIcon aria-hidden />}>
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
              >
                {p?.children ?? null}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Sykehus A" icon={<HospitalIcon aria-hidden />}>
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
              >
                {p?.children ?? null}
              </Timeline.Period>
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
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
    children: <div>50% sykemeldt</div>,
    id: 1,
  },
  {
    start: new Date("Apr 1 2022"),
    end: new Date("Apr 30 2022"),
    status: "neutral",
    icon: <ParasolBeachIcon aria-hidden />,
    label: "test",
    statusLabel: "Ferie",
    id: 2,
  },
  {
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
    id: 3,
  },
  {
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <VirusIcon aria-hidden />,
    statusLabel: "Stønad korona",
    id: 4,
  },
];

const jobb = [
  {
    start: new Date("Feb 2 2022"),
    end: new Date("Mar 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
    id: 11,
  },
  {
    start: new Date("Mar 2 2022"),
    end: new Date("Apr 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
    id: 22,
  },
  {
    start: new Date("May 2 2022"),
    end: new Date("June 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
    id: 33,
  },
  {
    start: new Date("June 2 2022"),
    end: new Date("July 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    id: 44,
  },
];

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Vi anbefaler å bruke 'aria-controls' begge veier mellom aktive perioder og panelet det refererer til. Dette gir brukere av enkelte skjermlesere keyboard-shortcuts for å hoppe mellom perioder og panelet.",
};
