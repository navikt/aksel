import NextLink from "next/link";
import { FormProgress } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const activeStep = 2; // Finn steg basert på rute

  return (
    <div style={{ width: "300px" }}>
      <FormProgress totalSteps={5} activeStep={activeStep}>
        <FormProgress.Step as={NextLink} href="#/steg-1" completed>
          Dine opplysninger
        </FormProgress.Step>
        <FormProgress.Step as={NextLink} href="#/steg-2">
          Barn
        </FormProgress.Step>
        <FormProgress.Step as={NextLink} href="#/steg-3">
          Fastlege
        </FormProgress.Step>
        <FormProgress.Step as={NextLink} href="#/steg-4">
          Tilleggsopplysninger
        </FormProgress.Step>
        <FormProgress.Step interactive={false}>Oppsummering</FormProgress.Step>
      </FormProgress>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Hvis hvert steg har sin egen URL, kan du bruke href på FormProgress.Step i stedet for onStepChange.",
};
