import { InternalHeader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title href="#home">Sykepenger</InternalHeader.Title>
      <InternalHeader.User name="Ola Normann" className="ml-auto" />
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 1,
};
