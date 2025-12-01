import { MonthPicker, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    defaultSelected: new Date("Aug 28 2020"),
    onMonthChange: console.info,
  });

  return (
    <MonthPicker {...monthpickerProps}>
      <MonthPicker.Input {...inputProps} label="Velg måned" readOnly />
    </MonthPicker>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
  desc: "Readonly-attributtet gjør at verdien ikke kan endres, men brukere vil fortsatt kunne markere og kopiere fra feltet. Til forskjell fra disabled-felter vil brukere også kunne tabbe til det, og feltet vil inkluderes når skjemaet sendes inn.",
};
