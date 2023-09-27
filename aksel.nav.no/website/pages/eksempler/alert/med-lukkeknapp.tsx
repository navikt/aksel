import { Alert, AlertProps } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import React from "react";

const AlertWithCloseButton = ({
  children,
  variant,
}: {
  children?: React.ReactNode;
  variant: AlertProps["variant"];
}) => {
  const [show, setShow] = React.useState(true);

  return (
    show && (
      <Alert variant={variant} closeButton onClose={() => setShow(false)}>
        {children || "Content"}
      </Alert>
    )
  );
};

const Example = () => {
  return (
    <div className="grid gap-4">
      <AlertWithCloseButton variant="info">
        Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
        en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
        arbeidsevnen.
      </AlertWithCloseButton>
      <AlertWithCloseButton variant="success">
        Søknad er sendt inn!
      </AlertWithCloseButton>
      <AlertWithCloseButton variant="warning">
        Du må være registrert hos NAV for å bruke aktivitetsplanen.
      </AlertWithCloseButton>
      <AlertWithCloseButton variant="error">
        Noe gikk galt! Prøv igjen om noen minutter.
      </AlertWithCloseButton>
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
