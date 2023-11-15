import { withDsExample } from "@/web/examples/withDsExample";
import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <Alert variant="warning">
      Du må være registrert hos NAV for å bruke aktivitetsplanen.
    </Alert>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
