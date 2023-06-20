import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

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

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
