import { withDsExample } from "@/web/examples/withDsExample";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary-neutral">Primary</Button>
      <Button variant="secondary-neutral">Secondary</Button>
      <Button variant="tertiary-neutral">Tertiary</Button>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
