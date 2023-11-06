import { LinkPanel } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import NextLink from "next/link";

const Example = () => {
  return (
    <LinkPanel href="#" border as={NextLink}>
      <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
    </LinkPanel>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  sandbox: false,
};
