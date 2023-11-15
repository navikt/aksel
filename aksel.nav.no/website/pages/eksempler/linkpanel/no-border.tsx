import { withDsExample } from "@/web/examples/withDsExample";
import { LinkPanel } from "@navikt/ds-react";

const Example = () => {
  return (
    <LinkPanel border={false} href="#">
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
  index: 2,
};
