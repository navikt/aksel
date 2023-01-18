import { SuccessFilled } from "@navikt/ds-icons";
import { Timeline } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const row1 = [
  {
    id: "1",
    start: new Date("Jan 1 2022"),
    end: new Date("Jan 31 2022"),
    status: "success",
    icon: <SuccessFilled aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "2",
    start: new Date("Feb 1 2022"),
    end: new Date("Mar 15 2022"),
    status: "danger",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    statusLabel: "Sykemeldt",
  },
  {
    id: "3",
    start: new Date("May 2 2022"),
    end: new Date("May 25 2022"),
    status: "success",
    icon: <SuccessFilled aria-hidden />,
    statusLabel: "Sykemeldt",
  },
  {
    id: "4",
    start: new Date("Mar 1 2022"),
    end: new Date("Mar 31 2022"),
    status: "success",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <SuccessFilled aria-hidden />,
    label: "test",
    statusLabel: "Sykemeldt",
  },
  {
    id: "5",
    start: new Date("Jul 1 2022"),
    end: new Date("Jul 31 2022"),
    status: "warning",
    icon: <SuccessFilled aria-hidden />,
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    statusLabel: "Sykemeldt",
  },
  {
    id: "6",
    start: new Date("Aug 1 2022"),
    end: new Date("Aug 30 2022"),
    status: "warning",
    icon: <SuccessFilled aria-hidden />,
    statusLabel: "Sykemeldt",
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
    /* children: <DummyLabel />, */
  },
  {
    id: "8",
    start: new Date("Feb 1 2022"),
    end: new Date("May 2 2022"),
    status: "neutral",
    onSelectPeriod: () => console.log("PERIOD SELECTED!"),
    icon: <SuccessFilled aria-hidden />,
    /* children: <DummyLabel />, */
  },
];

const Example = () => {
  return (
    <div className="min-w-[800px] overflow-x-auto">
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

export default withDsExample(Example);

export const args = {
  index: 0,
};
