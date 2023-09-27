import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="neutral-filled">Neutral</Tag>
      <Tag variant="info-filled">Info</Tag>
      <Tag variant="success-filled">Success</Tag>
      <Tag variant="warning-filled">Warning</Tag>
      <Tag variant="error-filled">Error</Tag>
      <Tag variant="alt1-filled">Alt1</Tag>
      <Tag variant="alt2-filled">Alt2</Tag>
      <Tag variant="alt3-filled">Alt3</Tag>
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
