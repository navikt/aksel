import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Alert variant="info">
        Hvilken aria-role og hvilken Alert-variant man bruker er knyttet til
        viktigheten av innholdet. I Info-varianten bør det ikke være nødvendig å
        bruke aria-roles. Bruk role=&quot;status&quot; ved unntak.
      </Alert>
      <Alert role="status" variant="success">
        Du gjorde noe rett! I Success-varianten kan du bruke
        role=&quot;status&quot;.
      </Alert>
      <Alert role="status" variant="warning">
        Det er noe som ikke stemmer! I Warning-varianten kan du bruke
        role=&quot;status&quot;
      </Alert>
      <Alert role="alert" variant="error">
        Kritisk feil! I Error-varianten kan du bruke role=&quot;alert&quot;
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
  index: 10,
};
