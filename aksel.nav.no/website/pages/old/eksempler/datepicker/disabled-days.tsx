import { DatePicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const disabledDays = [
  new Date("Oct 14 2024"),
  { from: new Date("Oct 21 2024"), to: new Date("Nov 10 2024") },
  (date) => isFriday(date),
];

const Example = () => {
  return (
    <DatePicker.Standalone
      today={new Date("Oct 9 2024")}
      disabled={disabledDays}
      onSelect={console.info}
    />
  );
};

const isFriday = (date: Date) => {
  return date.getDay() === 5;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
