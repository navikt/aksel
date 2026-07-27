import {
  BodyShort,
  Fieldset,
  HStack,
  Select,
  TextField,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Fieldset legend="Arbeidsgivers telefonnummer">
      <HStack gap="space-16">
        <Select label={<BodyShort as="span">Landkode</BodyShort>}>
          <option></option>
          <option>+45</option>
          <option>+46</option>
          <option>+47</option>
          <option>...</option>
        </Select>
        <TextField
          label={<BodyShort as="span">Nummer</BodyShort>}
          htmlSize={8}
        />
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

export const args: ExampleArgsT = {
  index: 1,
};
