import { Tag } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Tag variant="success">Success</Tag>;
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
