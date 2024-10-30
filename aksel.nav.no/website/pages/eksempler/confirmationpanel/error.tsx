import { useState } from "react";
import { ConfirmationPanel, Heading } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [state, setState] = useState(false);
  return (
    <ConfirmationPanel
      checked={state}
      label="Jeg bekrefter at jeg vil svare så riktig som jeg kan."
      onChange={() => setState((x) => !x)}
      error={!state && "Du må bekrefte før du kan fortsette."}
    >
      <Heading level="2" size="xsmall">
        Vi stoler på deg
      </Heading>
    </ConfirmationPanel>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
