import { withDsExample } from "@/web/examples/withDsExample";
import { PrinterSmallIcon } from "@navikt/aksel-icons";
import { BodyLong, Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <BodyLong>
      Officia incididunt{" "}
      <Link href="#">
        lenke til ny side
        <PrinterSmallIcon title="Skriv ut dokument" />
      </Link>{" "}
      occaecat commodo id ad aliquip.
    </BodyLong>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
