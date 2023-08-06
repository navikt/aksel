import { InternalHeader, Spacer } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title href="#home">Sykepenger</InternalHeader.Title>
      <Spacer />
      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 1,
};
