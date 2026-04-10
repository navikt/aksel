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
        <VStack gap="space-8">
          <HStack wrap gap="space-16">
            <DatePicker.Input
              {...fromInputProps}
              label="Fra"
              description="Format: dd.mm.åååå"
              error
              aria-describedby="input-range-with-error-example"
            />
            <DatePicker.Input
              {...toInputProps}
              label="Til"
              description="Format: dd.mm.åååå"
              error
              aria-describedby="input-range-with-error-example"
            />
          </HStack>
          <div
            id="input-range-with-error-example"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            <ErrorMessage showIcon>
              Du må fylle ut fra- og til-datoer.
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
  desc: "Eksempel på hvordan du legger inn feilmelding som gjelder for begge feltene.",
};
