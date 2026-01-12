import { useState } from "react";
import { Box, DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [hasError, setHasError] = useState(false);
  const { datepickerProps, inputProps } = useDatepicker({
    onValidate: (validation) => {
      setHasError(!validation.isValidDate);
      console.info(validation);
    },
  });

  return (
    <Box minHeight="24rem">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          label="Velg dato"
          description="Format: dd.mm.yyyy"
          error={
            hasError &&
            "Du må skrive en dato, f.eks. på denne måten: dd.mm.åååå"
          }
        />
      </DatePicker>
    </Box>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "Bruk `onValidate`-callback for å håndtere validering.",
};
