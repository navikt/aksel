import { useState } from "react";
import { FormProgress } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <FormProgress
      totalSteps={5}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    >
      <FormProgress.Step completed href="#">
        Dine opplysninger
      </FormProgress.Step>
      <FormProgress.Step href="#">Barn</FormProgress.Step>
      <FormProgress.Step href="#">Fastlege</FormProgress.Step>
      <FormProgress.Step href="#">Tilleggsopplysninger</FormProgress.Step>
      <FormProgress.Step interactive={false}>Oppsummering</FormProgress.Step>
    </FormProgress>
  );
};

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
  index: 0,
};
