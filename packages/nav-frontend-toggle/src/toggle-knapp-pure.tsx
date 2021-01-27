import * as React from "react";
import * as PT from "prop-types";
import * as classnames from "classnames";

import { omit, guid } from "nav-frontend-js-utils";

import "nav-frontend-toggle-style";

const knappCls = (props) =>
  classnames("toggleKnapp", {
    "toggleKnapp--pressed": props.pressed,
    "toggleKnapp--kompakt": props.kompakt,
  });

export interface ToggleKnappPureProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Content
   */
  children?: React.ReactNode;
  /**
   * Pressed state
   */
  pressed?: boolean;
  /**
   * Kompakt versjon
   */
  kompakt?: boolean;
  /**
   * onClick callback
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

class ToggleKnappPure extends React.PureComponent<ToggleKnappPureProps> {
  static defaultProps: ToggleKnappPureProps = {
    pressed: false,
  };

  render() {
    const renderProps = omit(
      this.props,
      "children",
      "pressed",
      "kompakt",
      "isRequired"
    );
    const knappId = guid();
    return (
      <button
        type="button"
        id={knappId}
        className={knappCls(this.props)}
        aria-pressed={this.props.pressed}
        {...renderProps}
      >
        {this.props.children}
      </button>
    );
  }
}

export const ToggleKnappPurePropsShape = PT.shape({
  /**
   * Content
   */
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
  /**
   * Pressed state
   */
  pressed: PT.bool,
  /**
   * Kompakt versjon
   */
  kompakt: PT.bool,
  /**
   * Custom onChange handler
   */
  onChange: PT.func,
}).isRequired;

(ToggleKnappPure as React.ComponentClass).propTypes = ToggleKnappPurePropsShape;

export default ToggleKnappPure;
