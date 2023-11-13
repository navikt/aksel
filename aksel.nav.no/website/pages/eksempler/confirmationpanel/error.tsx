import { withDsExample } from "@/web/examples/withDsExample";
import { ConfirmationPanel } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [state, setState] = useState(false);
  return (
    <ConfirmationPanel
      checked={state}
      label="Ja, jeg samtykker."
      onChange={() => setState((x) => !x)}
      error={!state && "Du må samtykke før du kan fortsette."}
    >
      For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
      om deg.
    </ConfirmationPanel>
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
