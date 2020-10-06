import * as React from "react";
import AlertStripe, { AlertStripeProps } from "./alertstripe";

class AlertStripeFeil extends React.Component<AlertStripeProps> {
  render() {
    return <AlertStripe type="feil" {...this.props} />;
  }
}

export default AlertStripeFeil;
