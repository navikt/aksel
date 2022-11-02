import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag variant="alt1">Alt1</Tag>
      <Tag variant="alt1-filled">Alt1</Tag>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 5,
  desc: "Har ingen global betydning. Tjenesten/produktet kan bestemme hva de symboliserer.",
};
