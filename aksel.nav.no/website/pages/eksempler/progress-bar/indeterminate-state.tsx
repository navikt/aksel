import { BodyShort, ProgressBar } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <BodyShort>Indeterminate</BodyShort>
      <ProgressBar duration={5} />
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
  desc: "'duration' brukes for å anslå lastetiden. Etter dette viser progress bar en indeterminate state-animasjon.",
  index: 1,
};
