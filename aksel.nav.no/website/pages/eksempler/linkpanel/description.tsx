import { LinkPanel } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

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

export default withDsExample(Example);

export const args = {
  index: 1,
};
