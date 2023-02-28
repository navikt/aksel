import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag variant="alt2">Alt2</Tag>
      <Tag variant="alt2-filled">Alt2</Tag>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Har ingen global betydning. Tjenesten/produktet kan bestemme hva de symboliserer.",
};
