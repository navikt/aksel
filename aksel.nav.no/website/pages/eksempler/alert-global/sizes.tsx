import { GlobalAlert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <GlobalAlert status="announcement" size="medium">
        <GlobalAlert.Header>
          <GlobalAlert.Title>
            Systemet vil være utilgjengelig natt til søndag (Medium)
          </GlobalAlert.Title>
          <GlobalAlert.Close onClick={() => alert("Lukket alert")} />
        </GlobalAlert.Header>
        <GlobalAlert.Content>
          Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
          endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold
          eller driftsmeldinger.
        </GlobalAlert.Content>
      </GlobalAlert>
      <GlobalAlert status="announcement" size="small">
        <GlobalAlert.Header>
          <GlobalAlert.Title>
            Systemet vil være utilgjengelig natt til søndag (Small)
          </GlobalAlert.Title>
          <GlobalAlert.Close onClick={() => alert("Lukket alert")} />
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
  index: 5,
  desc: "GlobalAlert kommer i to størrelser: medium og small.",
};
