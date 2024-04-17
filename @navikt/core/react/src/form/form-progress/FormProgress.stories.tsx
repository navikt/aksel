import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import FormProgress from "./FormProgress";

export default {
  title: "ds-react/FormProgress",
  component: FormProgress,
  decorators: [
    (story) => (
      <div style={{ width: 300, maxWidth: "100%", margin: "0 auto" }}>
        {story()}
      </div>
    ),
  ],
  parameters: { layout: "padded", chromatic: { disable: true } },
} satisfies Meta<typeof FormProgress>;

type Story = StoryFn<typeof FormProgress>;

export const Default: Story = (props) => (
  <FormProgress {...props} totalSteps={7}>
    <FormProgress.Step completed>Start søknad</FormProgress.Step>
    <FormProgress.Step>Personopplysninger</FormProgress.Step>
    <FormProgress.Step interactive={false}>Saksopplysninger</FormProgress.Step>
    <FormProgress.Step interactive={false}>
      Søknadstekst for en veldig spesifikk prosess i NAV som har lang tekst
    </FormProgress.Step>
    <FormProgress.Step>Vedlegg</FormProgress.Step>
    <FormProgress.Step>Oppsummering</FormProgress.Step>
    <FormProgress.Step>Innsending</FormProgress.Step>
  </FormProgress>
);
Default.args = { activeStep: 1, interactiveSteps: true };
Default.argTypes = {
  /*activeStep: {
    control: { type: "number" },
  },
  size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    }, */
};
