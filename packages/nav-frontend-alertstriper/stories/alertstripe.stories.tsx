import React from "react";
import Alertstripe, {
  AlertStripeAdvarsel,
  AlertStripeFeil,
  AlertStripeSuksess,
  AlertStripeInfo,
} from "../src/alertstripe";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Alertstripe",
  component: Alertstripe,
} as Meta;

export const All = () => (
  <div
    style={{
      display: "grid",
      gridAutoRows: "auto",
      rowGap: "2rem",
      gridAutoColumns: "fit-content",
    }}
  >
    <AlertStripeInfo>{`<AlertStripeInfo>`}</AlertStripeInfo>

    <Alertstripe type="info">{`<Alertstripe type="info">`}</Alertstripe>

    <AlertStripeSuksess>{`<AlertStripeSuksess>`}</AlertStripeSuksess>

    <Alertstripe type="suksess">{`<Alertstripe type="suksess">`}</Alertstripe>

    <AlertStripeAdvarsel>{`<AlertStripeAdvarsel>`}</AlertStripeAdvarsel>

    <Alertstripe type="advarsel">
      {` <Alertstripe type="advarsel">`}
    </Alertstripe>

    <AlertStripeFeil>{`<AlertStripeFeil>`}</AlertStripeFeil>

    <Alertstripe type="feil">{`<Alertstripe type="feil">`}</Alertstripe>

    <Alertstripe type="info" form="inline">
      {`<Alertstripe type="info" form="inline">`}
    </Alertstripe>

    <Alertstripe type="suksess" form="inline">
      {`<Alertstripe type="suksess" form="inline">`}
    </Alertstripe>

    <Alertstripe type="advarsel" form="inline">
      {`<Alertstripe type="advarsel" form="inline">`}
    </Alertstripe>

    <Alertstripe type="feil" form="inline">
      {`<Alertstripe type="feil" form="inline">`}
    </Alertstripe>

    <Alertstripe
      type="info"
      size="3em"
    >{`<Alertstripe type="info" size="3em">`}</Alertstripe>
  </div>
);
