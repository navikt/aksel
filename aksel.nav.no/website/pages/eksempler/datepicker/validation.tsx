import { useState } from "react";
import {
  Box,
  DatePicker,
  DateValidationT,
  useDatepicker,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [validation, setValidation] = useState<DateValidationT | null>(null);
  const [validationToShow, setValidationToShow] =
    useState<DateValidationT | null>(null);

  const { datepickerProps, inputProps } = useDatepicker({
    onValidate: (newValidation) => {
      setValidation(newValidation);
      console.info(newValidation);
    },
  });

  return (
    <Box minHeight="24rem">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          label="Velg startdato"
          description="Format: dd.mm.åååå"
          onBlur={() => setValidationToShow(validation)}
          error={
            validationToShow?.isValidDate === false &&
            "Du må velge eller skrive inn en startdato. Format: dd.mm.åååå"
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
  desc: "Bruk `onValidate`-callback for å håndtere validering. Se også [Mønster for skjemavalidering](/monster-maler/soknadsdialog/monster-for-skjemavalidering).",
};
