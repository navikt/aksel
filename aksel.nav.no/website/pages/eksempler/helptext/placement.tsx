import { HelpText } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-4">
      <HelpText title="Hvor kommer dette fra?">
        Informasjonen er hentet fra X sin statistikk fra 2021
      </HelpText>
      <HelpText title="Hvor kommer dette fra?" placement="right">
        Informasjonen er hentet fra X sin statistikk fra 2021
      </HelpText>
      <HelpText title="Hvor kommer dette fra?" placement="bottom">
        Informasjonen er hentet fra X sin statistikk fra 2021
      </HelpText>
      <HelpText title="Hvor kommer dette fra?" placement="left">
        Informasjonen er hentet fra X sin statistikk fra 2021
      </HelpText>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
