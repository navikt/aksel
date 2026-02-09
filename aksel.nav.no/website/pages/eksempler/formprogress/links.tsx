import { useEffect, useState } from "react";
import { FormProgress } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const activeStep = useActiveStep(); // Finn steg basert på route
  return (
    <FormProgress totalSteps={5} activeStep={activeStep}>
      <FormProgress.Step href="#/steg-1" completed>
        Dine opplysninger
      </FormProgress.Step>
      <FormProgress.Step href="#/steg-2">Barn</FormProgress.Step>
      <FormProgress.Step href="#/steg-3">Fastlege</FormProgress.Step>
      <FormProgress.Step href="#/steg-4">
        Tilleggsopplysninger
      </FormProgress.Step>
      <FormProgress.Step interactive={false}>Oppsummering</FormProgress.Step>
    </FormProgress>
  );
};

/* Du vil typisk bruke routeren din i stedet for denne hacky løsningen */
function useActiveStep() {
  const [activeStep, setActiveStep] = useState(1);
  useEffect(() => {
    const updateStep = () => {
      const hash = window.location.hash;
      setActiveStep(parseInt(hash[7], 10) || 1);
    };
    updateStep();
    window.addEventListener("hashchange", updateStep);
    return () => window.removeEventListener("hashchange", updateStep);
  }, []);
  return activeStep;
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "300px",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Hvis hvert steg har sin egen URL, kan du bruke href på FormProgress.Step i stedet for onStepChange.",
};
