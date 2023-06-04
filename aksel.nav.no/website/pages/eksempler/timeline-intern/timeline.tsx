import {
  VirusIcon,
  PencilIcon,
  HospitalIcon,
  PiggybankIcon,
  PersonIcon,
  ParasolBeachIcon,
} from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="min-w-[800px] overflow-x-auto">
      <Timeline>
        <Timeline.Row label="Person" icon={<PersonIcon aria-hidden />}>
          {person.map((p: any, i) => {
            return (
              <Timeline.Period
                key={i}
                start={p.start}
                end={p.end}
                status={p.status}
                icon={p.icon}
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
              >
                {p?.children ?? null}
              </Timeline.Period>
            );
          })}
        </Timeline.Row>
        <Timeline.Row label="Sykehus B" icon={<HospitalIcon aria-hidden />}>
          {jobb.map((p: any, i) => {
            return (
              <Timeline.Period
                key={i}
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

const person = [
  {
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <PencilIcon aria-hidden />,
    statusLabel: "Sykemeldt",
    children: <div>50% sykemeldt</div>,
  },
  {
    start: new Date("Apr 1 2022"),
    end: new Date("Apr 30 2022"),
    status: "neutral",
    icon: <ParasolBeachIcon aria-hidden />,
    label: "test",
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

const jobb = [
  {
    start: new Date("Feb 2 2022"),
    end: new Date("Mar 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
  },
  {
    start: new Date("Mar 2 2022"),
    end: new Date("Apr 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
  },
  {
    start: new Date("May 2 2022"),
    end: new Date("June 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
    children: <div>100% utbetaling</div>,
  },
  {
    start: new Date("June 2 2022"),
    end: new Date("July 1 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <PiggybankIcon aria-hidden />,
  },
];

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
