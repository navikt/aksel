import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import VStack from "../../layout/stack/VStack";
import UNSAFE_AkselLanguageProvider from "../../provider/i18n/LanguageProvider";
import FormProgress, { FormProgressProps } from "./FormProgress";

export default {
  title: "ds-react/FormProgress",
  component: FormProgress,
  decorators: [(story) => <div style={{ width: 300 }}>{story()}</div>],
  parameters: { chromatic: { disable: true } },
} satisfies Meta<typeof FormProgress>;

type ControllableProps = Pick<
  FormProgressProps,
  "activeStep" | "totalSteps" | "interactiveSteps"
>;

export const Default: StoryFn<ControllableProps> = (props) => (
  <div style={{ minHeight: 700 }}>
    <FormProgress {...props}>
      <FormProgress.Step href="#" completed>
        Start søknad
      </FormProgress.Step>
      <FormProgress.Step href="#">Personopplysninger</FormProgress.Step>
      <FormProgress.Step interactive={false}>
        Saksopplysninger
      </FormProgress.Step>
      <FormProgress.Step interactive={false}>
        Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
      </FormProgress.Step>
      <FormProgress.Step href="#">Vedlegg</FormProgress.Step>
      <FormProgress.Step href="#">Oppsummering</FormProgress.Step>
      <FormProgress.Step href="#">Innsending</FormProgress.Step>
    </FormProgress>
    <p>Noe innhold som dyttes ned</p>
  </div>
);
Default.args = { activeStep: 2, totalSteps: 7, interactiveSteps: true };

export const ProvidedTranslations: StoryFn = () => {
  const translations = {
    FormProgress: {
      step: "Step {activeStep} of {totalSteps}",
      showAllSteps: "Show all steps",
      hideAllSteps: "Hide all steps",
    },
  };

  return (
    <UNSAFE_AkselLanguageProvider translations={translations}>
      <FormProgress activeStep={2} totalSteps={7} interactiveSteps>
        <FormProgress.Step href="#" completed>
          Start søknad
        </FormProgress.Step>
        <FormProgress.Step href="#">Personopplysninger</FormProgress.Step>
        <FormProgress.Step interactive={false}>
          Saksopplysninger
        </FormProgress.Step>
        <FormProgress.Step interactive={false}>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </FormProgress.Step>
        <FormProgress.Step href="#">Vedlegg</FormProgress.Step>
        <FormProgress.Step href="#">Oppsummering</FormProgress.Step>
        <FormProgress.Step href="#">Innsending</FormProgress.Step>
      </FormProgress>
    </UNSAFE_AkselLanguageProvider>
  );
};

export const DefaultTranslations: StoryFn = () => {
  return (
    <UNSAFE_AkselLanguageProvider>
      <FormProgress activeStep={2} totalSteps={7} interactiveSteps>
        <FormProgress.Step href="#" completed>
          Start søknad
        </FormProgress.Step>
        <FormProgress.Step href="#">Personopplysninger</FormProgress.Step>
        <FormProgress.Step interactive={false}>
          Saksopplysninger
        </FormProgress.Step>
        <FormProgress.Step interactive={false}>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </FormProgress.Step>
        <FormProgress.Step href="#">Vedlegg</FormProgress.Step>
        <FormProgress.Step href="#">Oppsummering</FormProgress.Step>
        <FormProgress.Step href="#">Innsending</FormProgress.Step>
      </FormProgress>
    </UNSAFE_AkselLanguageProvider>
  );
};

export const ComponentTranslations: StoryFn = () => {
  const globalTranslations = {
    FormProgress: {
      step: "Step {activeStep} of {totalSteps}",
      showAllSteps: "Show all steps",
      hideAllSteps: "Hide all steps",
    },
  };
  const translations = {
    step: "Skref {activeStep} af {totalSteps}",
    showAllSteps: "Sýndu öll skref",
    hideAllSteps: "Fela öll skref",
  };
  return (
    <UNSAFE_AkselLanguageProvider translations={globalTranslations}>
      <FormProgress
        translations={translations}
        activeStep={2}
        totalSteps={7}
        interactiveSteps
      >
        <FormProgress.Step href="#" completed>
          Start søknad
        </FormProgress.Step>
        <FormProgress.Step href="#">Personopplysninger</FormProgress.Step>
        <FormProgress.Step interactive={false}>
          Saksopplysninger
        </FormProgress.Step>
        <FormProgress.Step interactive={false}>
          Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
        </FormProgress.Step>
        <FormProgress.Step href="#">Vedlegg</FormProgress.Step>
        <FormProgress.Step href="#">Oppsummering</FormProgress.Step>
        <FormProgress.Step href="#">Innsending</FormProgress.Step>
      </FormProgress>
    </UNSAFE_AkselLanguageProvider>
  );
};

export const Controlled: StoryFn = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button onClick={() => setOpen(!open)}>State: {open.toString()}</button>
      <FormProgress
        totalSteps={5}
        activeStep={3}
        open={open}
        onOpenChange={setOpen}
      >
        <FormProgress.Step completed>Start søknad</FormProgress.Step>
        <FormProgress.Step completed interactive={false}>
          Personopplysninger
        </FormProgress.Step>
        <FormProgress.Step>Saksopplysninger</FormProgress.Step>
        <FormProgress.Step>Vedlegg</FormProgress.Step>
        <FormProgress.Step interactive={false}>Oppsummering</FormProgress.Step>
      </FormProgress>
    </>
  );
};

export const Chromatic: StoryFn = () => (
  <VStack gap="10">
    <div>
      <Default activeStep={1} totalSteps={7} />
    </div>
    <div>
      <Controlled />
    </div>
  </VStack>
);
Chromatic.parameters = { chromatic: { disable: false } };
