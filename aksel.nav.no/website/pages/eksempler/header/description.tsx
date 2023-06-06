import { Header } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Header>
      <Header.Title as="h1">Sykepenger</Header.Title>
      <Header.User
        name="Ola Normann"
        description="D123456"
        className="ml-auto"
      />
    </Header>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 2,
};
