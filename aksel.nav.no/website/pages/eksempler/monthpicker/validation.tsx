import { useState } from "react";
import {
  Box,
  MonthPicker,
  MonthValidationT,
  useMonthpicker,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [validation, setValidation] = useState<MonthValidationT | null>(null);
  const [validationToShow, setValidationToShow] =
    useState<MonthValidationT | null>(null);

  const { monthpickerProps, inputProps } = useMonthpicker({
    onValidate: (newValidation) => {
      setValidation(newValidation);
      console.info(newValidation);
    },
  });

  return (
    <Box minHeight="24rem">
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input
          {...inputProps}
          label="Velg startmåned"
          description="Format: mm.åååå"
          onBlur={() => setValidationToShow(validation)}
          error={
            validationToShow?.isValidMonth === false &&
            "Du må velge eller skrive inn en startmåned. Format: mm.åååå"
          }
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
  desc: "Bruk `onValidate`-callback for å håndtere validering. Se også [Mønster for skjemavalidering](/monster-maler/soknadsdialog/monster-for-skjemavalidering).",
};
