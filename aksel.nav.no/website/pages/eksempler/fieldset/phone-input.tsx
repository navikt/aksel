import { Fieldset, HStack, Select, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Fieldset legend="Arbeidsgivers telefonnummer">
      <HStack gap="space-16">
        <Select label="Landkode">
          <option value=""></option>
          <option>+45</option>
          <option>+46</option>
          <option>+47</option>
          <option>...</option>
        </Select>
        <TextField label="Nummer" htmlSize={8} />
      </HStack>
    </Fieldset>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
