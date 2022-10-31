import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const handleChange = (val: any[]) => console.log(val);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      onChange={(val: any[]) => handleChange(val)}
    >
      <Checkbox hideLabel value="Bakerst">
        Bakerst
      </Checkbox>
      <Checkbox hideLabel value="Midterst">
        Midterst
      </Checkbox>
      <Checkbox hideLabel value="Fremst">
        Fremst
      </Checkbox>
    </CheckboxGroup>
  );
};

export default withDsExample(Example);

export const args = {
  index: 3,
};
