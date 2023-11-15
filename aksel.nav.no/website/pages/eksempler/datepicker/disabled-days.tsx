import { withDsExample } from "@/web/examples/withDsExample";
import { DatePicker } from "@navikt/ds-react";

const Example = () => {
  const disabledDays = [
    new Date("Oct 10 2022"),
    { from: new Date("Oct 17 2022"), to: new Date("Nov 10 2022") },
    (date) => isFriday(date),
  ];

  return (
    <DatePicker.Standalone
      today={new Date("Oct 9 2022")}
      disabled={disabledDays}
      onSelect={console.log}
    />
  );
};

const isFriday = (date: Date) => {
  return date.getDay() === 5;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
