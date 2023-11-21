import { withDsExample } from "@/web/examples/withDsExample";
import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [state, setState] = useState(false);
  return (
    <ConfirmationPanel
      checked={state}
      label="Jeg bekrefter at jeg vil svare så godt jeg kan på spørsmålene i søknaden."
      onChange={() => setState((x) => !x)}
      error={!state && "Du må bekrefte før du kan fortsette."}
    >
      <Heading level="2" size="xsmall">
        Vi stoler på deg
      </Heading>
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
