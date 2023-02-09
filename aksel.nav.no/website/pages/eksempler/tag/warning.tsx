import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag variant="warning">Warning</Tag>
      <Tag variant="warning-filled">Warning</Tag>
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
  desc: "Beskriver noe som er en advarsel, usikkert, noe som må utbedres, etc.",
};
