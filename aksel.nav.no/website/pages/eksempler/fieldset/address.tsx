import { Fieldset, Heading, TextField, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-36">
      <Fieldset
        legend={
          <Heading as="span" size="small">
            Privat adresse
          </Heading>
        }
      >
        <TextField label="Gate" />
        <TextField label="Postnummer" htmlSize={8} />
        <TextField label="Sted" />
        <TextField label="Land" style={{ maxWidth: "300px" }} />
      </Fieldset>

      <Fieldset
        legend={
          <Heading as="span" size="small">
            Arbeidsgivers adresse
          </Heading>
        }
      >
        <TextField label="Gate" />
        <TextField label="Postnummer" htmlSize={8} />
        <TextField label="Sted" />
        <TextField label="Land" style={{ maxWidth: "300px" }} />
      </Fieldset>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 3,
  desc: "Fieldset kan brukes for å legge til ledetekst på felter som opptrer flere ganger. (Her har vi justert opp størrelsen på legend-teksten for å skape et tydeligere hierarki.)",
};
