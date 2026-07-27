import { BodyLong, Fieldset, Heading, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" spacing>
        Arbeidsgivers adresse
      </Heading>
      <BodyLong spacing>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora sunt
        commodi corporis voluptatibus, maiores laborum, repellat nam labore.
      </BodyLong>
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

export const args: ExampleArgsT = {
  index: 5,
  desc: "En annen variant av 'Heading as legend'-eksempelet der overskriften er utenfor og vi i stedet skjuler legend visuelt med `hideLegend` for å unngå duplisert tekst for seende.",
};
