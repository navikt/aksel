import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button icon={<PencilIcon aria-hidden />}>Rediger</Button>
      <Button icon={<PencilIcon aria-hidden />} />
      <Button iconPosition="right" icon={<PencilIcon aria-hidden />}>
        Rediger
      </Button>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
