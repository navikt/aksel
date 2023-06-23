import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button disabled variant="primary">
        Primary
      </Button>
      <Button disabled variant="secondary">
        Secondary
      </Button>
      <Button disabled variant="tertiary">
        Tertiary
      </Button>
      <Button disabled variant="danger">
        Danger
      </Button>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 20,
};
