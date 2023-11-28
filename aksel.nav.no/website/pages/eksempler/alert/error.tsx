import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
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
  desc: "Brukes til å informere brukere om at noe kritisk har skjedd og vil kreve umiddelbar oppmerksomhet.",
};
