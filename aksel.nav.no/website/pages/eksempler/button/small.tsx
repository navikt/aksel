import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="small" variant="primary" icon={<PencilIcon aria-hidden />}>
        Primary
      </Button>
      <Button size="small" variant="secondary">
        Secondary
      </Button>
      <Button size="small" variant="tertiary">
        Tertiary
      </Button>
      <Button size="small" variant="danger">
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
  index: 2,
};
