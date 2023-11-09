import { withDsExample } from "@/web/examples/withDsExample";
import { InternalHeader, Spacer } from "@navikt/ds-react";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Spacer />
      <InternalHeader.User name="Ola Normann" description="D123456" />
    </InternalHeader>
  );
};

export default withDsExample(Example, { variant: "full" });

export const args = {
  index: 2,
};
