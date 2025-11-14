import { GlobalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <GlobalAlert status="success">
      <GlobalAlert.Header>
        <GlobalAlert.Title>Du logget inn som Ola Normann</GlobalAlert.Title>
      </GlobalAlert.Header>
      <GlobalAlert.Content>
        Suksess brukes for å informere brukeren om at en handling er fullført
        eller at noe positivt har skjedd. Eksempelvis at data er lagret eller en
        prosess er fullført.
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
  index: 2,
};
