import { Alert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Alert variant="info">
        Hvilken ARIA role og hvilken Alert-variant man bruker er knyttet til
        viktigheten av innholdet. I Info-varianten bør det ikke være nødvendig å
        bruke ARIA role. Bruk role=&quot;status&quot; ved unntak.
      </Alert>
      <Alert role="status" variant="success">
        Du gjorde noe rett! I Success-varianten kan du bruke
        role=&quot;status&quot;.
      </Alert>
      <Alert role="status" variant="warning">
        Det er noe som ikke stemmer! I Warning-varianten kan du bruke
        role=&quot;status&quot;
      </Alert>
      <Alert role="alert" variant="error">
        Kritisk feil! I Error-varianten kan du bruke role=&quot;alert&quot;
      </Alert>
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
  index: 6,
  desc: "Bruk 'role' dersom alerten vises dynamisk.",
};
