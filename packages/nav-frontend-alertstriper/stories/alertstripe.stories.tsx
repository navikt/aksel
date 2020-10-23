import React from "react";
import Alertstripe, {
  AlertStripeAdvarsel,
  AlertStripeFeil,
  AlertStripeSuksess,
  AlertStripeInfo,
  AlertStripeBaseProps,
} from "../src/alertstripe";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Alertstripe",
  component: Alertstripe,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    chromatic: { disable: true, viewports: [320, 768, 1280] },
  },
} as Meta;

const Template: Story<AlertStripeBaseProps> = (args: AlertStripeBaseProps) => (
  <Alertstripe {...args} />
);

export const Advarsel = Template.bind({});
Advarsel.args = {
  type: "advarsel",
  children:
    "Innsending av søknad er nede, vennligst prøv igjen senere. Se driftsmeldinger for mer informasjon.",
};
export const Feil = Template.bind({});
Feil.args = {
  type: "advarsel",
  children:
    "Innsending av søknad er nede, vennligst prøv igjen senere. Se driftsmeldinger for mer informasjon.",
};
export const Info = Template.bind({});
Info.args = {
  type: "advarsel",
  children:
    "Innsending av søknad er nede, vennligst prøv igjen senere. Se driftsmeldinger for mer informasjon.",
};
export const Suksess = Template.bind({});
Suksess.args = {
  type: "advarsel",
  children: "Søknaden ble sendt!",
};
