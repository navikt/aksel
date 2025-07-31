import { useEffect, useRef, useState } from "react";
import { Button, ErrorSummary, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const errorRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError && errorRef.current) {
      errorRef.current.focus();
    }
  }, [hasError]);

  return (
    <VStack gap="12" align="start">
      {hasError && (
        <ErrorSummary ref={errorRef}>
          <ErrorSummary.Item href="#1">
            Felt må fylles ut med alder
          </ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-post
          </ErrorSummary.Item>
        </ErrorSummary>
      )}
      <Button
        onClick={() => {
          hasError ? errorRef.current?.focus() : setHasError(true);
        }}
      >
        Test fokus
      </Button>
    </VStack>
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
  desc: "Eksempel på hvordan du kan sette fokus på ErrorSummary ved submit. Hvis du gjør en ny sidelasting kan du også sette en `id` og referere til den i URLens hash. Se [Mønster for skjemavalidering](/monster-maler/soknadsdialog/monster-for-skjemavalidering) for et mer fullstendig eksempel.",
};
