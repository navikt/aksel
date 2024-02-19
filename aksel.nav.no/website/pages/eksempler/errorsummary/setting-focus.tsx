import { useEffect, useRef, useState } from "react";
import { Button, ErrorSummary } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const errorRef = useRef<HTMLElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    errorRef.current && errorRef.current.focus();
  }, [hasError]);

  return (
    <div className="flex flex-col items-start gap-12">
      {hasError && (
        <ErrorSummary
          heading="Du må fikse disse feilene før du kan sende inn søknad."
          focusTargetRef={errorRef}
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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Sett fokus på ErrorSummary ved submit. Hvis du gjør en ny sidelasting kan du sette en ID på ErrorSummary og referere til den i URLens anchor + legge på aria-live.",
};
