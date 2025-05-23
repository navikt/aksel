import { Radio, RadioGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string) => console.info(val);

  return (
    <RadioGroup
      legend="Velg din aldersgruppe."
      onChange={handleChange}
      value="20"
      readOnly
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
  index: 98,
  desc: "Readonly-attributtet gjør at valget ikke kan endres, men brukere vil fortsatt kunne markere og kopiere teksten. Til forskjell fra disabled vil brukere også kunne tabbe til det, og feltet vil inkluderes når skjemaet sendes inn.",
};
