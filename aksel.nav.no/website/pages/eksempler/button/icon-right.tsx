import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Button icon={<Edit aria-hidden />} iconPosition="right">
      Rediger
    </Button>
  );
};

export default withDsExample(Example);

export const args = {
  index: 9,
};
