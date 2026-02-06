import {
  Box,
  DatePicker,
  ErrorMessage,
  HStack,
  VStack,
  useRangeDatepicker,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onRangeChange: console.info,
  });

  return (
    <Box minHeight="24rem">
      <DatePicker {...datepickerProps}>
        <VStack gap="space-16">
          <HStack wrap gap="space-16">
            <DatePicker.Input
              {...fromInputProps}
              label="Fra"
              description="Format: dd.mm.åååå"
              error={true}
              aria-errormessage="input-range-with-error-example"
            />
            <DatePicker.Input
              {...toInputProps}
              label="Til"
              description="Format: dd.mm.åååå"
              error={true}
              aria-errormessage="input-range-with-error-example"
            />
          </HStack>
          <div
            id="input-range-with-error-example"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            <ErrorMessage showIcon>
              Ugyldig dato. Formatet må være dd.mm.åååå
            </ErrorMessage>
          </div>
        </VStack>
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
  index: 11,
  desc: "Før du velger å bruke range mode, vurder om to separate datepickere i single mode er bedre. Range fungerer best for korte perioder innenfor en måned.",
};
