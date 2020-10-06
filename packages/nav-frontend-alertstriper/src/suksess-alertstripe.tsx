import * as React from "react";
import AlertStripe, { AlertStripeProps } from "./alertstripe";

class AlertStripeSuksess extends React.Component<AlertStripeProps> {
  render() {
    return <AlertStripe type="suksess" {...this.props} />;
  }
}

export default AlertStripeSuksess;
