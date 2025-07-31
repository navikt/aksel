import { PrinterSmallIcon } from "@navikt/aksel-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      Officia incididunt{" "}
      <Link href="/eksempel">
        lenke til ny side
        <PrinterSmallIcon title="Skriv ut dokument" />
      </Link>{" "}
      occaecat commodo id ad aliquip.
    </BodyLong>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
