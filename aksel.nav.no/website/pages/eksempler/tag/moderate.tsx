import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="neutral-moderate">Neutral</Tag>
      <Tag variant="info-moderate">Info</Tag>
      <Tag variant="success-moderate">Success</Tag>
      <Tag variant="warning-moderate">Warning</Tag>
      <Tag variant="error-moderate">Error</Tag>
      <Tag variant="alt1-moderate">Alt1</Tag>
      <Tag variant="alt2-moderate">Alt2</Tag>
      <Tag variant="alt3-moderate">Alt3</Tag>
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
