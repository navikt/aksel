import { withDsExample } from "@/web/examples/withDsExample";
import { Switch } from "@navikt/ds-react";

const Example = () => {
  return <Switch hideLabel>Varsle med SMS</Switch>;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
