import { LocalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LocalAlert status="warning">
      <LocalAlert.Header>
        <LocalAlert.Title>
          Denne siden vil være synlig for personer utenfor din organisasjon
        </LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>
        Advarsel brukes for å advare dem om noe viktig. Eksempelvis at de
        mangler informasjon eller at en handling kan få negative konsekvenser.
      </LocalAlert.Content>
    </LocalAlert>
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
