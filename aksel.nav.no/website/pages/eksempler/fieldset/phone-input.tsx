import { Fieldset, HStack, Select, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack asChild gap="space-16">
      <Fieldset legend="Arbeidsgivers telefonnummer">
        <Select label="Landkode">
          <option value=""></option>
          <option>+45</option>
          <option>+46</option>
          <option>+47</option>
          <option>...</option>
        </Select>
        <TextField label="Nummer" htmlSize={8} />
      </Fieldset>
    </HStack>
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
