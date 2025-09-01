import { Radio, RadioGroup, Stack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <RadioGroup legend="Har du barn?">
      <Stack
        gap="space-0 space-24"
        direction={{ xs: "column", sm: "row" }}
        wrap={false}
      >
        <Radio value="1">Ja</Radio>
        <Radio value="0">Nei</Radio>
      </Stack>
    </RadioGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
