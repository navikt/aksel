import { GlobalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <GlobalAlert status="error">
      <GlobalAlert.Header>
        <GlobalAlert.Title>
          Kunne ikke koble til backend (Kode 362)
        </GlobalAlert.Title>
      </GlobalAlert.Header>
      <GlobalAlert.Content>
        Error brukes til å informere brukeren om at noe kritisk har skjedd.
        Eksempelvis at en handling ikke ble fullført eller at systemet er nede.
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
  index: 4,
};
