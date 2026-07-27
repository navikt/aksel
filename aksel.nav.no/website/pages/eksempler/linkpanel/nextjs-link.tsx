import NextLink from "next/link";
import { LinkPanel } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LinkPanel href="#" border as={NextLink}>
      <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
    </LinkPanel>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 3,
  sandbox: false,
};
