import { LinkPanel } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LinkPanel href="#" border>
      <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
      <LinkPanel.Description>
        Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
      </LinkPanel.Description>
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
  index: 1,
};
