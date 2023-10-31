export const codeBefore = `import { Alert } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
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
`;

export const codeAfter = `import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
  );
};`;
