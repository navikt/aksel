import { withDsExample } from "@/web/examples/withDsExample";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
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
};
