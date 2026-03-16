import { Fieldset, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Fieldset legend="Arbeidsgivers postadresse">
      <TextField label="Gateadresse" />
      <TextField label="Postnummer" htmlSize={8} />
      <TextField label="Sted" />
      <TextField label="Land" htmlSize={30} />
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
  index: 3,
  desc: "Fieldset kan brukes for å gruppere felter som tilhører en annen kontekst enn resten av skjemaet. Dette er mest aktuelt hvis feltene ikke står alene. Alternativt kan man ha feltene på en egen side, der konteksten kommer fram i overskriften.",
};
