import { FormProgress } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const activeStep = 2; // Finn steg basert på rute

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
