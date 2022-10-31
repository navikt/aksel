import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="neutral-filled">Neutral</Tag>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
  desc: "Beskriver noe nøytralt",
};
