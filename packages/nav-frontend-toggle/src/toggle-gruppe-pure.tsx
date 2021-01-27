import * as React from "react";
import * as PT from "prop-types";
import * as classnames from "classnames";

import { omit, guid } from "nav-frontend-js-utils";
import ToggleKnappPure, {
  ToggleKnappPureProps,
  ToggleKnappPurePropsShape,
} from "./toggle-knapp-pure";

import "nav-frontend-toggle-style";

export interface ToggleGruppePureProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array av toggle knapper, se `toggle-knapp-pure.tsx`
   */
  toggles: ToggleKnappPureProps[];
  /**
   * Egendefinert klassenavn.
   */
  className?: string;
  /**
   * Hvis 'true' reduseres høyre/venstre-padding på knappene betraktelig.
   */
  kompakt?: boolean;
}

class ToggleGruppePure extends React.PureComponent<ToggleGruppePureProps> {
  render() {
    const renderProps = omit(
      this.props,
      "className",
      "children",
      "kompakt",
      "toggles",
      "defaultToggles"
    );
    return (
      <div
        className={classnames("toggleGruppe", this.props.className)}
        {...renderProps}
      >
        {this.props.toggles.map((toggle, i) => (
          <ToggleKnappPure
            key={guid()}
            kompakt={this.props.kompakt}
            {...toggle}
          />
        ))}
      </div>
    );
  }
}

(ToggleGruppePure as React.ComponentClass).propTypes = {
  /**
   * Array av toggle knapper, se `toggle-knapp-pure.tsx`
   */
  toggles: PT.arrayOf(ToggleKnappPurePropsShape).isRequired,
  /**
   * Egendefinert klassenavn.
   */
  className: PT.string,
  /**
   * Hvis 'true' reduseres høyre/venstre-padding på knappene betraktelig.
   */
  kompakt: PT.bool,
};

export default ToggleGruppePure;
