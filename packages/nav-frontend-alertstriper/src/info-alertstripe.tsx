import * as React from "react";
import AlertStripe, { AlertStripeProps } from "./alertstripe";

class AlertStripeInfo extends React.Component<AlertStripeProps> {
  render() {
    return <AlertStripe type="info" {...this.props} />;
  }
}

export default AlertStripeInfo;
