import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Alert size="small" variant="info">
        Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
        en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
        arbeidsevnen.
      </Alert>
      <Alert size="small" variant="success">
        Søknad er sendt inn!
      </Alert>
      <Alert size="small" variant="warning">
        Du må være registrert hos NAV for å bruke aktivitetsplanen.
      </Alert>
      <Alert size="small" variant="error">
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
  index: 1,
};
