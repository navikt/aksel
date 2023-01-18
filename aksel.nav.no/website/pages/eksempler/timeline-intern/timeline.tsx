import {
  Coronavirus,
  DialogReport,
  Edit,
  Email,
  EmailOpened,
  Hospital,
  Money,
  Office1,
  Office2,
  PeopleDialogOutline,
  SuccessFilled,
  Vacation,
} from "@navikt/ds-icons";
import { Timeline } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const row1 = [
  {
    id: "1",
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "warning",
    icon: <Edit aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "2",
    start: new Date("Feb 1 2022"),
    end: new Date("Mar 15 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <Money aria-hidden />,
  },
  {
    id: "3",
    start: new Date("Mar 1 2022"),
    end: new Date("Mar 31 2022"),
    status: "neutral",
    onSelectPeriod: () => console.log("SELECTED!"),
    icon: <Vacation aria-hidden />,
    label: "test",
    statusLabel: "Ferie",
  },
  {
    id: "4",
    start: new Date("May 2 2022"),
    end: new Date("May 25 2022"),
    status: "success",
    statusLabel: "Utbetaling",
    icon: <Money aria-hidden />,
  },
  {
    id: "5",
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <Edit aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "6",
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <Coronavirus aria-hidden />,
    statusLabel: "Stønad korona",
  },
];

const row2 = [
  {
    id: "7",
    start: new Date("Feb 1 2022"),
    end: new Date("May 2 2022"),
    status: "neutral",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <Email aria-hidden />,
    statusLabel: "Sendte bruker melding, med svarfrist",
  },
  {
    id: "8",
    start: new Date("May 13 2022"),
    end: new Date("May 30 2022"),
    status: "warning",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <DialogReport aria-hidden />,
    statusLabel: "Bruker started samtale etter utgått svarfrist",
  },
];

const Example = () => {
  return (
    <div className="min-w-[800px] overflow-x-auto">
      <Timeline>
        <Timeline.Row label="Person" icon={<Office1 aria-hidden />}>
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
        <Timeline.Row
          label="Dialoger"
          icon={<PeopleDialogOutline aria-hidden />}
        >
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

export default withDsExample(Example);

export const args = {
  index: 0,
};
