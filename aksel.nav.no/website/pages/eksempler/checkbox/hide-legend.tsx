import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string[]) => console.log(val);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      hideLegend
      onChange={handleChange}
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
  index: 4,
  desc: "Legend må være meningsfull selv om den skjules, siden den fortsatt leses av skjermlesere.",
};
