import { withDsExample } from "@/web/examples/withDsExample";
import { Radio, RadioGroup } from "@navikt/ds-react";

const Example = () => {
  const handleChange = (val: any) => console.log(val);

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={(val: any) => handleChange(val)}
      error="Vi fant ingen resultater på din aldersgruppe."
    >
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
