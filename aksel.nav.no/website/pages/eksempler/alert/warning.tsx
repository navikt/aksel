import { Alert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Alert variant="warning">
      Du må være registrert hos NAV for å bruke aktivitetsplanen.
    </Alert>
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
  desc: "Bruk denne når du vil at brukeren skal foreta en bestemt handling eller for å advare dem om noe viktig.",
};
