import { GlobalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <GlobalAlert status="warning">
      <GlobalAlert.Header>
        <GlobalAlert.Title>
          Denne siden vil være synlig for personer utenfor din organisasjon
        </GlobalAlert.Title>
      </GlobalAlert.Header>
      <GlobalAlert.Content>
        Advarsel brukes for å advare dem om noe viktig. Eksempelvis at de
        mangler informasjon eller at en handling kan få negative konsekvenser.
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
  index: 3,
};
