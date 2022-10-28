import { HelpText } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <HelpText title="Hvor kommer dette fra?">
      Informasjonen er hentet fra X sin statistikk fra 2021
    </HelpText>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
