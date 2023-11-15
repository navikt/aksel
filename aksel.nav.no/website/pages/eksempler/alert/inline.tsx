import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Alert inline variant="info">
        Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
        en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
        arbeidsevnen.
      </Alert>
      <Alert inline variant="success">
        Søknad er sendt inn!
      </Alert>
      <Alert inline variant="warning">
        Du må være registrert hos NAV for å bruke aktivitetsplanen.
      </Alert>
      <Alert inline variant="error">
        Noe gikk galt! Prøv igjen om noen minutter.
      </Alert>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
