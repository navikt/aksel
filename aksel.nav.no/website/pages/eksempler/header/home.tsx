import { InternalHeader, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title href="#home">Sykepenger</InternalHeader.Title>
      <Spacer />
      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  title: "Hjem-lenke",
};
