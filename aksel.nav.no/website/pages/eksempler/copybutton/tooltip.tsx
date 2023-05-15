import { CopyButton, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Tooltip content="Kopier fødselsnummer">
      <CopyButton copyText="12003045000" />
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
  desc: "Man kan bruke Tooltip for å gi en mer beskrivende tekst til CopyButton. Dette er mest relevant når CopyButton er plassert utenfor context og med bare ikon.",
};
