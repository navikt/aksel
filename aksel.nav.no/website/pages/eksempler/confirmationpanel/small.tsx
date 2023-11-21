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
      size="small"
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
  index: 1,
  desc: "Small brukes på interne flater der det er behov for et mer komprimert grensesnitt.",
};
