import { withDsExample } from "@/web/examples/withDsExample";
import { HelpText } from "@navikt/ds-react";

const Example = () => {
  return (
    <HelpText title="Hvor kommer dette fra?">
      Informasjonen er hentet fra X sin statistikk fra 2021
    </HelpText>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
