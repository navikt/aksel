import { ErrorSummary } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <ErrorSummary
      heading="Du må fikse disse feilene før du kan sende inn søknad."
      size="small"
    >
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

export const args = {
  index: 1,
};
