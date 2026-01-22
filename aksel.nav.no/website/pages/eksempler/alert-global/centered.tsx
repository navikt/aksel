import { GlobalAlert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <GlobalAlert status="announcement">
        <GlobalAlert.Header>
          <GlobalAlert.Title>
            Systemet vil være utilgjengelig natt til søndag (centered)
          </GlobalAlert.Title>
        </GlobalAlert.Header>
        <GlobalAlert.Content>
          Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
          endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold
          eller driftsmeldinger.
        </GlobalAlert.Content>
      </GlobalAlert>
      <GlobalAlert status="announcement" centered={false}>
        <GlobalAlert.Header>
          <GlobalAlert.Title>
            Systemet vil være utilgjengelig natt til søndag (not centered)
          </GlobalAlert.Title>
        </GlobalAlert.Header>
        <GlobalAlert.Content>
          Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
          endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold
          eller driftsmeldinger.
        </GlobalAlert.Content>
      </GlobalAlert>
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
  index: 8,
};
