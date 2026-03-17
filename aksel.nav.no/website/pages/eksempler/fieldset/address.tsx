import { Fieldset, TextField, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-36">
      <Fieldset legend="Privat adresse">
        <TextField label="Gate" />
        <TextField label="Postnummer" htmlSize={8} />
        <TextField label="Sted" />
        <TextField label="Land" style={{ maxWidth: "300px" }} />
      </Fieldset>
      <Fieldset legend="Arbeidsgivers adresse">
        <TextField label="Gate" />
        <TextField label="Postnummer" htmlSize={8} />
        <TextField label="Sted" />
        <TextField label="Land" style={{ maxWidth: "300px" }} />
      </Fieldset>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Fieldset kan brukes for å legge til ledetekst på felter som opptrer flere ganger.",
};
