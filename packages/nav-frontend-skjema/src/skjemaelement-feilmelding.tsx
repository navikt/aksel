import * as React from "react";
import * as PT from "prop-types";
import { Feilmelding } from "nav-frontend-typografi";

class SkjemaelementFeilmelding extends React.Component<
  React.HTMLAttributes<HTMLDivElement>
> {
  static defaultProps: Partial<React.HTMLAttributes<HTMLDivElement>> = {
    "aria-live": "polite",
  };

  render() {
    const { children, ...other } = this.props;
    return (
      <div {...other}>
        {children && (
          <div className="skjemaelement__feilmelding">
            <Feilmelding>{children}</Feilmelding>
          </div>
        )}
      </div>
    );
  }
}

export default SkjemaelementFeilmelding;
