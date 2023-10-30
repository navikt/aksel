import { filterCode } from "../filter-code";

const code = `import { Alert } from "@navikt/ds-react";
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

const codeAfter = `import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
  );
};

export default withDsExample(Example);

`;
describe("Filtering out unwanted code for codesnippet", () => {
  test("filterCode should remove code", () => {
    const codeResult = filterCode(code);

    expect(codeResult).toEqual(codeAfter);
  });
});
