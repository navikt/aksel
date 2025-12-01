import { Radio, RadioGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string) => console.info(val);

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={handleChange}
      disabled
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
  index: 99,
  desc: "Vi fraråder bruk av disabled state. Vurder om du trenger å vise feltet i det hele tatt, om du heller kan bruke `readOnly`, eller bare kan skrive det ut i ren tekst.",
};
