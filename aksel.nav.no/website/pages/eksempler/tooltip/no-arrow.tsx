import { PrinterLargeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Tooltip content="Skriv ut dokument" arrow={false}>
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
  index: 2,
};
