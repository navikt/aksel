import { Print } from "@navikt/ds-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Tooltip content="Skriv ut dokument" keys={["cmd", "p"]}>
      <Button icon={<Print title="demo knapp" />} />
    </Tooltip>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
