import React from "react";
import Alertstripe, {
  AlertStripeAdvarsel,
  AlertStripeFeil,
  AlertStripeSuksess,
  AlertStripeInfo,
} from "../src/alertstripe";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Alertstripe",
  component: Alertstripe,
  parameters: {
    chromatic: { disable: true },
  },
} as Meta;

const Template = ({ children, type, ...args }) => (
  <Alertstripe type={type} {...args}>
    {children}
  </Alertstripe>
);

export const Example = Template.bind({});
Example.args = {
  type: "info",
  children: "Excepteur esse id incididunt magna nostrud.",
};

export const Info = () => (
  <>
    <AlertStripeInfo>{`<AlertStripeInfo>`}</AlertStripeInfo>
    <br />
    <Alertstripe type="info">{`<Alertstripe type="info">`}</Alertstripe>
  </>
);
export const Suksess = () => (
  <>
    <AlertStripeSuksess>{`<AlertStripeSuksess>`}</AlertStripeSuksess>
    <br />
    <Alertstripe type="suksess">{`<Alertstripe type="suksess">`}</Alertstripe>
  </>
);
export const Advarsel = () => (
  <>
    <AlertStripeAdvarsel>{`<AlertStripeAdvarsel>`}</AlertStripeAdvarsel>
    <br />
    <Alertstripe type="advarsel">
      {` <Alertstripe type="advarsel">`}
    </Alertstripe>
  </>
);
export const Feil = () => (
  <>
    <AlertStripeFeil>{`<AlertStripeFeil>`}</AlertStripeFeil>
    <br />
    <Alertstripe type="feil">{`<Alertstripe type="feil">`}</Alertstripe>
  </>
);
export const Inline = () => (
  <>
    <Alertstripe type="info" form="inline">
      {`<Alertstripe type="info" form="inline">`}
    </Alertstripe>
  </>
);
