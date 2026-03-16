import { Fieldset, HStack, Select } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack asChild gap="space-16">
      <Fieldset legend="Når vil du ta ut alderspensjon?">
        <Select label="Velg år">
          <option value=""></option>
          <option>62 år</option>
          <option>63 år</option>
          <option>64 år</option>
          <option>...</option>
        </Select>
        <Select label="Velg måneder">
          <option value=""></option>
          <option>0 mnd. (apr.)</option>
          <option>1 mnd. (mai)</option>
          <option>2 mnd. (juni)</option>
          <option>...</option>
        </Select>
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
  index: 0,
  desc: "Bruk av Fieldset her gjør at man unngår å gjenta konteksten i hver Select. Alternativt kunne man hatt spørsmålet på en separat side.",
};
