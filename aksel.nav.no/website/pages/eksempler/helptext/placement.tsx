import { HelpText } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
