import { GlobalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <GlobalAlert status="announcement">
      <GlobalAlert.Header>
        <GlobalAlert.Title>
          Systemet vil være utilgjengelig natt til søndag
        </GlobalAlert.Title>
      </GlobalAlert.Header>
      <GlobalAlert.Content>
        Kunngjøringer brukes for å formidle noe om appen eller systemet, eller
        endringer som påvirker brukerne. Eksempelvis planlagt vedlikehold eller
        driftsmeldinger.
      </GlobalAlert.Content>
    </GlobalAlert>
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
