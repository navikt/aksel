import { ProgressBar } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <p id="indeterminate">6 sek duration med 4 sek delay</p>
      <ProgressBar duration={6} aria-labelledby="indeterminate" />
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
