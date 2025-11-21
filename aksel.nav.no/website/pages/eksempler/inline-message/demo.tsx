import { InlineMessage, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <InlineMessage status="info">
        Kvalitetssikring må gjennomføres før vedtaket kan fattes
      </InlineMessage>
      <InlineMessage status="success">
        Utkastet ble lagret klokken 14:35
      </InlineMessage>
      <InlineMessage status="warning">
        Ingen registrert postadresse for bruker, sjekk kontaktinformasjon
      </InlineMessage>
      <InlineMessage status="error">
        Kan ikke fatte vedtaket fordi brukeren er inaktiv i Arena
      </InlineMessage>
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
  desc: "Bruk InlineMessage for å gi brukeren viktig informasjon i en tekstflyt uten at det tar for mye plass visuelt.",
};
