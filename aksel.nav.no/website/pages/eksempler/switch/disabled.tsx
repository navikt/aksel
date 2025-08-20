import { Switch, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Switch disabled>Varsle med SMS</Switch>
      <Switch disabled checked>
        Varsle med SMS
      </Switch>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
  desc: "Vi fraråder bruk av disabled state. Vurder om du trenger å vise feltet i det hele tatt, om du heller kan bruke 'readOnly', eller bare kan skrive det ut i ren tekst.",
};
