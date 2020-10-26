import React from "react";
import Alertstripe, {
  AlertStripeAdvarsel,
  AlertStripeFeil,
  AlertStripeSuksess,
  AlertStripeInfo,
} from "../src/alertstripe";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Alertstripe/All",
  component: Alertstripe,
} as Meta;

export const All = () => (
  <>
    <AlertStripeInfo>{`<AlertStripeInfo>`}</AlertStripeInfo>
    <br />
    <Alertstripe type="info">{`<Alertstripe type="info">`}</Alertstripe>
    <br />
    <AlertStripeSuksess>{`<AlertStripeSuksess>`}</AlertStripeSuksess>
    <br />
    <Alertstripe type="suksess">{`<Alertstripe type="suksess">`}</Alertstripe>
    <br />
    <AlertStripeAdvarsel>{`<AlertStripeAdvarsel>`}</AlertStripeAdvarsel>
    <br />
    <Alertstripe type="advarsel">
      {` <Alertstripe type="advarsel">`}
    </Alertstripe>
    <br />
    <AlertStripeFeil>{`<AlertStripeFeil>`}</AlertStripeFeil>
    <br />
    <Alertstripe type="feil">{`<Alertstripe type="feil">`}</Alertstripe>
    <br />
    <Alertstripe type="info" form="inline">
      {`<Alertstripe type="info" form="inline">`}
    </Alertstripe>
    <br />
    <Alertstripe type="suksess" form="inline">
      {`<Alertstripe type="suksess" form="inline">`}
    </Alertstripe>
    <br />
    <Alertstripe type="advarsel" form="inline">
      {`<Alertstripe type="advarsel" form="inline">`}
    </Alertstripe>
    <br />
    <Alertstripe type="feil" form="inline">
      {`<Alertstripe type="feil" form="inline">`}
    </Alertstripe>
    <br />
    <Alertstripe
      type="info"
      size="3em"
    >{`<Alertstripe type="info" size="3em">`}</Alertstripe>
  </>
);
