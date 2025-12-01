import { Radio, RadioGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string) => console.info(val);

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={handleChange}
      description="Informasjonen blir brukt for å gi deg bedre søketreff."
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
  index: 2,
  desc: "Bruk `description` i tillegg til `legend` når det er behov for mer utfyllende forklaring.",
};
