import { BodyShort, Fieldset, HStack, Select } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Fieldset legend="Når vil du ta ut alderspensjon?">
      <HStack gap="space-16">
        <Select label={<BodyShort as="span">Velg år</BodyShort>}>
          <option></option>
          <option>62 år</option>
          <option>63 år</option>
          <option>64 år</option>
          <option>...</option>
        </Select>
        <Select label={<BodyShort as="span">Velg måneder</BodyShort>}>
          <option></option>
          <option>0 mnd. (apr.)</option>
          <option>1 mnd. (mai)</option>
          <option>2 mnd. (juni)</option>
          <option>...</option>
        </Select>
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
  index: 0,
  desc: "Bruk av Fieldset her gjør at man unngår å gjenta konteksten i hver Select. (Her har vi justert ned font-vekten på labelen til hvert felt for å skape et tydeligere hierarki.)",
};
