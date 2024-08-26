import { PrinterLargeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Tooltip content="Skriv ut dokument" keys={["cmd", "p"]}>
      <Button icon={<PrinterLargeIcon aria-hidden />} />
    </Tooltip>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
