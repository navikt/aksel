import { Button, ErrorSummary } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useEffect, useRef, useState } from "react";

const Example = () => {
  const errorRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    errorRef?.current && errorRef.current.focus();
  }, [hasError]);

  return (
    <div className="flex flex-col items-start gap-12">
      {hasError && (
        <ErrorSummary
          ref={errorRef}
          heading="Du må fikse disse feilene før du kan sende inn søknad."
        >
          <ErrorSummary.Item href="#1">
            Felt må fylles ut med alder
          </ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      )}
      <Button onClick={() => setHasError(!hasError)}>Test fokus</Button>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
