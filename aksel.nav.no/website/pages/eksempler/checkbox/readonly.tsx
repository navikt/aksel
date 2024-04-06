import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string[]) => console.log(val);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      onChange={handleChange}
      value={["Midterst"]}
      readOnly
    >
      <Checkbox value="Bakerst">Bakerst</Checkbox>
      <Checkbox value="Midterst">Midterst</Checkbox>
      <Checkbox value="Fremst">Fremst</Checkbox>
    </CheckboxGroup>
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
  desc: "Readonly-attributtet gjør at valgene ikke kan endres, men brukere vil fortsatt kunne markere og kopiere teksten. Til forskjell fra disabled vil brukere også kunne tabbe til det, og feltet vil inkluderes når skjemaet sendes inn.",
};
