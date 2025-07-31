import { useState } from "react";
import {
  HospitalIcon,
  ParasolBeachIcon,
  PencilIcon,
  PersonGroupIcon,
  PiggybankIcon,
  VirusIcon,
} from "@navikt/aksel-icons";
import { Box, Timeline, TimelinePeriodProps } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activePeriod, setActivePeriod] = useState<string | null>(null);

  return (
    <Box marginInline="auto" maxWidth="800px">
      <Timeline>
        <Timeline.Pin date={new Date("Mar 15 2022")}>
          <p>Utbetalt: 12 345 kr</p>
        </Timeline.Pin>
        <Timeline.Row label="Person" icon={<PersonGroupIcon aria-hidden />}>
          {person.map((p, i) => (
            <Timeline.Period
              key={i}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
              onSelectPeriod={() => p.id && setActivePeriod(p.id)}
              isActive={activePeriod === p.id}
              aria-controls="timeline-panel"
              id={p.id}
            >
              {p.children ?? null}
            </Timeline.Period>
          ))}
        </Timeline.Row>
        <Timeline.Row label="Sykehus A" icon={<HospitalIcon aria-hidden />}>
          {jobb.map((p, i) => (
            <Timeline.Period
              key={i}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
              onSelectPeriod={() => p.id && setActivePeriod(p.id)}
              isActive={activePeriod === p.id}
              aria-controls="timeline-panel"
              id={p.id}
            >
              {p.children ?? null}
            </Timeline.Period>
          ))}
        </Timeline.Row>
      </Timeline>
      {activePeriod && (
        <div
          aria-controls={activePeriod}
          id="timeline-panel"
          className="mt-8"
        >{`${activePeriod}: ${[...person, ...jobb].find(
          (p) => p.id === activePeriod,
        )?.start}`}</div>
      )}
    </Box>
  );
};

const person: TimelinePeriodProps[] = [
  {
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
    children: <div>50% sykemeldt</div>,
    id: "1",
  },
  {
    start: new Date("Apr 1 2022"),
    end: new Date("Apr 30 2022"),
    status: "neutral",
    icon: <ParasolBeachIcon aria-hidden />,
    statusLabel: "Ferie",
    id: "2",
  },
  {
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
    id: "3",
  },
  {
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <VirusIcon aria-hidden />,
    statusLabel: "Stønad korona",
    id: "4",
  },
];

const jobb: TimelinePeriodProps[] = [
  {
    start: new Date("Feb 2 2022"),
    end: new Date("Mar 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
    id: "11",
  },
  {
    start: new Date("Mar 2 2022"),
    end: new Date("Apr 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
    id: "22",
  },
  {
    start: new Date("May 2 2022"),
    end: new Date("June 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
    id: "33",
  },
  {
    start: new Date("June 2 2022"),
    end: new Date("July 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    id: "44",
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Vi anbefaler å bruke 'aria-controls' begge veier mellom aktive perioder og panelet det refererer til. Dette gir brukere av enkelte skjermlesere hurtigtaster for å hoppe mellom perioder og panelet.",
};
