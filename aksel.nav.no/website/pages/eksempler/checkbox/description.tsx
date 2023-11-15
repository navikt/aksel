import { withDsExample } from "@/web/examples/withDsExample";
import { Checkbox, CheckboxGroup } from "@navikt/ds-react";

const Example = () => {
  const handleChange = (val: any[]) => console.log(val);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      description="Fremste rad er nærmest nødutgangene"
      onChange={(val: any[]) => handleChange(val)}
    >
      <Checkbox value="Bakerst">Bakerst</Checkbox>
      <Checkbox value="Midterst">Midterst</Checkbox>
      <Checkbox value="Fremst">Fremst</Checkbox>
    </CheckboxGroup>
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
