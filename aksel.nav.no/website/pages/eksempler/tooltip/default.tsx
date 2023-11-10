import { withDsExample } from "@/web/examples/withDsExample";
import { PrinterLargeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";

const Example = () => {
  return (
    <Tooltip content="Skriv ut dokument">
      <Button icon={<PrinterLargeIcon title="demo knapp" />} />
    </Tooltip>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
