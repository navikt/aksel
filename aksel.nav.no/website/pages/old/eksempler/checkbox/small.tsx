import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const handleChange = (val: string[]) => console.info(val);

  return (
    <CheckboxGroup
      legend="Transportmiddel"
      onChange={handleChange}
      size="small"
    >
      <Checkbox value="car">Bil</Checkbox>
      <Checkbox value="taxi">Drosje</Checkbox>
      <Checkbox value="public">Kollektivt</Checkbox>
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
