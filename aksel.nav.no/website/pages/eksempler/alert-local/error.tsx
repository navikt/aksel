import { LocalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LocalAlert status="error">
      <LocalAlert.Header>
        <LocalAlert.Title>
          Vi kunne ikke hente dataene dine (Kode 362)
        </LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>
        Error brukes til å informere brukeren om at noe kritisk har skjedd.
        Eksempelvis at en handling ikke ble fullført eller at systemet er nede.
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
  index: 4,
};
