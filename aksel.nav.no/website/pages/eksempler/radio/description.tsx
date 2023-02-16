import { Radio, RadioGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const handleChange = (val: any) => console.log(val);

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={(val: any) => handleChange(val)}
      description="Informasjonen blir brukt for å gi deg bedre søketreff."
    >
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
