import { MonthPicker, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [hasError, setHasError] = useState(false);
  const { monthpickerProps, inputProps } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onValidate: (val) => {
      setHasError(!val.isValidMonth);
      console.log(val);
    },
  });

  return (
    <div className="min-h-96">
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input
          {...inputProps}
          label="Velg månede"
          error={hasError && "Du må velge månede"}
        />
      </MonthPicker>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Bruk onValidate-callback for å håndtere validering.",
};
