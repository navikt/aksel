import { ErrorSummary } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ErrorSummary
      heading="Du må rette disse feilene før du kan sende inn søknaden:"
      headingTag="h3"
    >
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-post
      </ErrorSummary.Item>
    </ErrorSummary>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Ved behov kan overskriftsnivået endres med `headingTag`-propen.",
};
