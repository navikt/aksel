import { Alert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Alert variant="info">Info - Formidler viktig informasjon.</Alert>
      <Alert variant="success">
        Success - Bekrefter at en oppgave er fullført som forventet.
      </Alert>
      <Alert variant="warning">
        Warning - Bruk denne når du vil at brukeren skal foreta en bestemt
        handling eller for å advare dem om noe viktig.
      </Alert>
      <Alert variant="error">
        Error - Brukes til å informere brukeren om at noe kritisk har skjedd.
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
  index: 0,
};
