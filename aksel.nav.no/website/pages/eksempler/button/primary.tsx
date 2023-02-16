import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Button>Primary</Button>
      <Button variant="primary-neutral">Primary</Button>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Brukes som primærhandling i løsningen. Som regel ønsker man å ha kun én primærknapp per side.",
};
