import { Alert, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Alert inline variant="info">
        Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
        en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
        arbeidsevnen.
      </Alert>
      <Alert inline variant="success">
        Søknad er sendt inn!
      </Alert>
      <Alert inline variant="warning">
        Du må være registrert hos Nav for å bruke aktivitetsplanen.
      </Alert>
      <Alert inline variant="error">
        Noe gikk galt! Prøv igjen om noen minutter.
      </Alert>
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
  desc: "Bruk inline om varselet er en del av annet innhold eller når panelet og bakgrunnsfarge blir støy for brukeren.",
};
