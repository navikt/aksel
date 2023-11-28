import { withDsExample } from "@/web/examples/withDsExample";
import { Switch } from "@navikt/ds-react";

const Example = () => {
  return (
    <Switch description="Vi sender SMS mellom 08:00 og 17:00">
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
  index: 2,
};
