import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <Alert variant="info">
      Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
      en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
      arbeidsevnen.
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
  index: 2,
  desc: "Skal formidle ren informasjon",
};
