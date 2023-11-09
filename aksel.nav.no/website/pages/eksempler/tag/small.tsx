import { withDsExample } from "@/web/examples/withDsExample";
import { Tag } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag size="small" variant="neutral">
        Small
      </Tag>
      <Tag size="small" variant="neutral-moderate">
        Small
      </Tag>
      <Tag size="small" variant="neutral-filled">
        Small
      </Tag>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
