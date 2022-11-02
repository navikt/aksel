import { Alert } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Alert variant="info">
      Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
      en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
      arbeidsevnen.
    </Alert>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
