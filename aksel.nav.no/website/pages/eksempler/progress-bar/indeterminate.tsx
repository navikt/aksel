import { ProgressBar } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <p id="indeterminate">Laster opp fil</p>
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
  desc: "Med duration-propen kan man legge inn et anslag i sekunder, så simulerer komponenten progresjon.",
};
