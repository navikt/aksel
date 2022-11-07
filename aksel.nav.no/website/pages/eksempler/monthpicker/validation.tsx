import { UNSAFE_MonthPicker, UNSAFE_useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [hasError, setHasError] = useState(false);
  const { monthpickerProps, inputProps } = UNSAFE_useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onValidate: (val) => {
      setHasError(!val.isValidMonth);
      console.log(val);
    },
  });

  return (
    <div className="min-h-96">
      <UNSAFE_MonthPicker {...monthpickerProps}>
        <div className="grid gap-4">
          <UNSAFE_MonthPicker.Input
            {...inputProps}
            label="Velg månede"
            error={hasError && "Du må velge månede"}
          />
        </div>
      </UNSAFE_MonthPicker>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 5,
  desc: "Bruk onValidate-callback for å håndtere validering.",
};
