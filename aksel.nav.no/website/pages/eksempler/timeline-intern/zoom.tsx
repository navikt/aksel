import {
  HospitalIcon,
  ParasolBeachIcon,
  PencilIcon,
  PersonIcon,
  PiggybankIcon,
  VirusIcon,
} from "@navikt/aksel-icons";
import { Timeline, TimelinePeriodProps } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="min-w-[800px]">
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
            />
          ))}
        </Timeline.Row>
        <Timeline.Row label="Sykehus B" icon={<HospitalIcon aria-hidden />}>
          {jobb.map((p, i) => (
            <Timeline.Period
              key={i}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
            />
          ))}
        </Timeline.Row>
        <Timeline.Zoom>
          <Timeline.Zoom.Button label="3 mnd" interval="month" count={3} />
          <Timeline.Zoom.Button label="7 mnd" interval="month" count={7} />
          <Timeline.Zoom.Button label="9 mnd" interval="month" count={9} />
          <Timeline.Zoom.Button label="1.5 år" interval="year" count={1.5} />
        </Timeline.Zoom>
      </Timeline>
    </div>
  );
};

const person: TimelinePeriodProps[] = [
  {
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    start: new Date("Apr 1 2022"),
    end: new Date("Apr 30 2022"),
    status: "neutral",
    icon: <ParasolBeachIcon aria-hidden />,
    statusLabel: "Ferie",
  },
  {
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <VirusIcon aria-hidden />,
    statusLabel: "Stønad korona",
  },
];

const jobb: TimelinePeriodProps[] = [
  {
    start: new Date("Feb 2 2022"),
    end: new Date("Mar 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
  {
    start: new Date("Mar 2 2022"),
    end: new Date("Apr 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
  {
    start: new Date("May 2 2022"),
    end: new Date("June 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
  {
    start: new Date("June 2 2022"),
    end: new Date("July 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Lar deg \"zoome\" til predefinerte tidsperioder. Bruk 'startDate/endDate'-prop i Timeline for å justere hvilken tidsperiode som blir vist.",
};
