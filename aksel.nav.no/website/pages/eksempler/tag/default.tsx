import { withDsExample } from "@/web/examples/withDsExample";
import { Tag } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="alt1">Alt1</Tag>
      <Tag variant="alt2">Alt2</Tag>
      <Tag variant="alt3">Alt3</Tag>
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
