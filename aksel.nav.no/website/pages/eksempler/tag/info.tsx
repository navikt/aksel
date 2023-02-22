import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag variant="info">Info</Tag>
      <Tag variant="info-filled">Info</Tag>
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
  desc: "Beskriver noe som er til opplysning, nyhet, etc.",
};
