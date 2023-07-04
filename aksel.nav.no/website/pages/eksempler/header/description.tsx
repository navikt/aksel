import { InternalHeader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <InternalHeader.User
        name="Ola Normann"
        description="D123456"
        className="ml-auto"
      />
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 2,
};
