import { useState } from "react";
import { Box, MonthPicker, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [hasError, setHasError] = useState(false);
  const { monthpickerProps, inputProps } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onValidate: (val) => {
      setHasError(!val.isValidMonth);
      console.info(val);
    },
  });

  return (
    <Box minHeight="24rem">
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input
          {...inputProps}
          label="Velg måned"
          error={hasError && "Du må velge måned"}
        />
      </MonthPicker>
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
  index: 5,
  desc: "Bruk onValidate-callback for å håndtere validering.",
};
