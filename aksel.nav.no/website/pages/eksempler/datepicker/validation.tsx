import { useState } from "react";
import { Box, DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [hasError, setHasError] = useState(false);
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onValidate: (val) => {
      setHasError(!val.isValidDate);
      console.info(val);
    },
  });

  return (
    <Box minHeight="24rem">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          label="Velg dato"
          error={hasError && "Noe er feil"}
        />
      </DatePicker>
    </Box>
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
  desc: "Bruk `onValidate`-callback for å håndtere validering.",
};
