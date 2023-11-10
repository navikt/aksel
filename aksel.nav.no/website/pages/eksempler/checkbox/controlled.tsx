import { withDsExample } from "@/web/examples/withDsExample";
import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [state, setState] = useState(["Midterst"]);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      onChange={(v) => setState(v)}
      value={state}
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
  index: 10,
};
