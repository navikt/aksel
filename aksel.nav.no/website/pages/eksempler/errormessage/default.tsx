import { withDsExample } from "@/web/examples/withDsExample";
import { ErrorMessage } from "@navikt/ds-react";

const Example = () => {
  return (
    <ErrorMessage>Du må fylle ut tekstfeltet før innsending.</ErrorMessage>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
