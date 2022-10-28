import { Print } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      Officia incididunt{" "}
      <Link href="#">
        lenke til ny side
        <Print title="Skriv ut dokument" />
      </Link>{" "}
      occaecat commodo id ad aliquip.
    </BodyLong>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
