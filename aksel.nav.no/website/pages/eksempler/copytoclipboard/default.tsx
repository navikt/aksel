import { CopyToClipboard } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <CopyToClipboard copyText="3.14" popoverText="Kopierte PI">
      Kopier
    </CopyToClipboard>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
