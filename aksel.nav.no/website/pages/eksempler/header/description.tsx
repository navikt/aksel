import { InternalHeader, Spacer } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Spacer />
      <InternalHeader.User name="Ola Normann" description="D123456" />
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 2,
};
