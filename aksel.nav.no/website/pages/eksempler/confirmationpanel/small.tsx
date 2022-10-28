import { ConfirmationPanel } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [state, setState] = useState(false);
  return (
    <ConfirmationPanel
      checked={state}
      label="Ja, jeg samtykker."
      onChange={() => setState((x) => !x)}
      size="small"
    >
      For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
      om deg.
    </ConfirmationPanel>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
