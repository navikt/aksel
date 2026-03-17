import { Fieldset, Heading, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" spacing>
        Arbeidsgivers adresse
      </Heading>
      <Fieldset legend="Arbeidsgivers adresse" hideLegend>
        <TextField label="Gate" />
        <TextField label="Postnummer" htmlSize={8} />
        <TextField label="Sted" />
        <TextField label="Land" style={{ maxWidth: "300px" }} />
      </Fieldset>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Selv om du har en overskrift som fungerer som ledetekst, kan det likevel være nyttig å bruke fieldset mht. skjermleser-brukere. Siden legend da blir overflødig for seende kan den skjules visuelt med `hideLegend`.",
};
