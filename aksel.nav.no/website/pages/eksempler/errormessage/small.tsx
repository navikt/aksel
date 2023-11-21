import { withDsExample } from "@/web/examples/withDsExample";
import { ErrorMessage } from "@navikt/ds-react";

const Example = () => {
  return (
    <ErrorMessage size="small">
      Du må fylle ut tekstfeltet før innsending.
    </ErrorMessage>
  );
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
