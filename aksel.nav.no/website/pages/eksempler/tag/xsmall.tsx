import { withDsExample } from "@/web/examples/withDsExample";
import { Tag } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag size="xsmall" variant="neutral">
        xsmall
      </Tag>
      <Tag size="xsmall" variant="neutral-moderate">
        xsmall
      </Tag>
      <Tag size="xsmall" variant="neutral-filled">
        xsmall
      </Tag>
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
