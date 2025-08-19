import { useState } from "react";
import {
  HospitalIcon,
  ParasolBeachIcon,
  PencilIcon,
  PersonIcon,
  PiggybankIcon,
  VirusIcon,
} from "@navikt/aksel-icons";
import { Box, Timeline, TimelinePeriodProps } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activePeriod, setActivePeriod] = useState("");

  return (
    <Box marginInline="auto" maxWidth="800px">
      <Timeline>
        <Timeline.Row label="Person" icon={<PersonIcon aria-hidden />}>
          {person.map((p, i) => (
            <Timeline.Period
              key={i}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
              onSelectPeriod={() => setActivePeriod(p.id)}
              isActive={activePeriod === p.id}
              aria-controls="timeline-panel"
              id={p.id}
            />
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
              onSelectPeriod={() => setActivePeriod(p.id)}
              isActive={activePeriod === p.id}
              aria-controls="timeline-panel"
              id={p.id}
            />
          ))}
        </Timeline.Row>
      </Timeline>
      {activePeriod && (
        <Box
          aria-controls={activePeriod}
          id="timeline-panel"
          marginBlock="space-32 0"
        >{`${activePeriod}: ${[...person, ...jobb].find(
          (p) => p.id === activePeriod,
        )?.start}`}</Box>
      )}
    </Box>
  );
};

const person = [
  {
    id: "1",
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "2",
    start: new Date("Apr 1 2022"),
    end: new Date("Apr 30 2022"),
    status: "neutral",
    icon: <ParasolBeachIcon aria-hidden />,
    statusLabel: "Ferie",
  },
  {
    id: "3",
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "4",
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <VirusIcon aria-hidden />,
    statusLabel: "Stønad korona",
  },
] satisfies TimelinePeriodProps[];

const jobb = [
  {
    id: "5",
    start: new Date("Feb 2 2022"),
    end: new Date("Mar 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
  {
    id: "6",
    start: new Date("Mar 2 2022"),
    end: new Date("Apr 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
  {
    id: "7",
    start: new Date("May 2 2022"),
    end: new Date("June 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
  {
    id: "8",
    start: new Date("June 2 2022"),
    end: new Date("July 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
] satisfies TimelinePeriodProps[];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "'onSelectPeriod' og 'isActive' lar deg velge aktive perioder for visning av ekstra informasjon en annen plass i UI.",
};

export const args = {
  index: 2,
};
