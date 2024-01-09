import { useState } from "react";
import { Switch } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [checkedValue, setCheckedValue] = useState("");

  console.log(checkedValue);
  return (
    <Switch
      value="sms"
      checked={!!checkedValue}
      onChange={(v) => setCheckedValue((x) => (x ? "" : v.target.value))}
    >
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
  index: 6,
};
