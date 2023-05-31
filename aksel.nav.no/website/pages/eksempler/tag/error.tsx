import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag variant="error">Error</Tag>
      <Tag variant="error-filled">Error</Tag>
      <Tag variant="error-moderate">Error</Tag>
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
  desc: "Beskriver noe som er farlig, tjenestebrudd, irreversibelt, etc.",
};
