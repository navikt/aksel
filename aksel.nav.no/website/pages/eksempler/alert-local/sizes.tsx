import { LocalAlert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <LocalAlert status="announcement" size="medium">
        <LocalAlert.Header>
          <LocalAlert.Title>
            Systemet vil være utilgjengelig for vedlikehold natt til søndag
            (Medium)
          </LocalAlert.Title>
          <LocalAlert.Close onClick={() => alert("Lukket alert")} />
        </LocalAlert.Header>
        <LocalAlert.Content>
          Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
          endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold
          eller driftsmeldinger.
        </LocalAlert.Content>
      </LocalAlert>
      <LocalAlert status="announcement" size="small">
        <LocalAlert.Header>
          <LocalAlert.Title>
            Systemet vil være utilgjengelig for vedlikehold natt til søndag
            (Small)
          </LocalAlert.Title>
          <LocalAlert.Close onClick={() => alert("Lukket alert")} />
        </LocalAlert.Header>
        <LocalAlert.Content>
          Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
          endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold
          eller driftsmeldinger.
        </LocalAlert.Content>
      </LocalAlert>
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
  desc: "LocalAlert kommer i to størrelser: medium og small.",
};
