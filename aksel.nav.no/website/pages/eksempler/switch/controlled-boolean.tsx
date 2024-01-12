import { useState } from "react";
import { Switch } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)}>
      Varsle med SMS
    </Switch>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
};
