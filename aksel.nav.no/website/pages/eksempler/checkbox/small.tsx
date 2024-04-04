import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string[]) => console.log(val);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      onChange={handleChange}
      size="small"
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
  index: 1,
  desc: "Small brukes på interne flater der det er behov for et mer komprimert grensesnitt.",
};
