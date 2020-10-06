import * as React from "react";
import AlertStripe, { AlertStripeProps } from "./alertstripe";

class AlertStripeAdvarsel extends React.Component<AlertStripeProps> {
  render() {
    return <AlertStripe type="advarsel" {...this.props} />;
  }
}

export default AlertStripeAdvarsel;
