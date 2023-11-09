import { withDsExample } from "@/web/examples/withDsExample";
import { ErrorSummary } from "@navikt/ds-react";

const Example = () => {
  return (
    <ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad.">
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
