import { CopyButton, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [active, setActive] = useState(false);

  return (
    <Tooltip
      content={active ? "Kopierte fødselsnummer" : "Kopier fødselsnummer"}
    >
      <CopyButton
        clipboardText="12003045000"
        onActiveChange={(v) => setActive(v)}
      />
    </Tooltip>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
  desc: "Man bruke Tooltip for å gi en mer beskrivende tekst til CopyButton. Dette er mest relevant når CopyButton er plassert utenfor context og med bare ikon.",
};
