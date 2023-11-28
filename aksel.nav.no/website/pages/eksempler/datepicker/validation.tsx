import { withDsExample } from "@/web/examples/withDsExample";
import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [hasError, setHasError] = useState(false);
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onValidate: (val) => {
      setHasError(!val.isValidDate);
      console.log(val);
    },
  });

  return (
    <div className="min-h-96">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          label="Velg dato"
          error={hasError && "Noe er feil"}
        />
      </DatePicker>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "Bruk onValidate-callback for å håndtere validering.",
};
