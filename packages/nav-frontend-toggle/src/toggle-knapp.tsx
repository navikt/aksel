import * as React from "react";
import * as PT from "prop-types";

import { omit } from "nav-frontend-js-utils";
import ToggleKnappPure from "./toggle-knapp-pure";

export interface ToggleKnappProps {
  /**
   * Pressed state
   */
  pressed?: boolean;
  /**
   * Kompakt versjon
   */
  kompakt?: boolean;
  /**
   * onClick callback som returnerer pressed state
   */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    pressed: boolean
  ) => void;
}

export interface ToggleKnappState {
  pressed: boolean;
}

class ToggleKnapp extends React.Component<ToggleKnappProps, ToggleKnappState> {
  static defaultProps: ToggleKnappProps = {
    pressed: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: props.pressed,
    };
  }

  handleClick = (e) => {
    const state = !this.state.pressed;
    this.setState({
      pressed: state,
    });
    if (this.props.onClick) this.props.onClick(e, state);
  };

  render() {
    const renderProps = omit(this.props, "children", "pressed");
    return (
      <ToggleKnappPure
        pressed={this.state.pressed}
        {...renderProps}
        onClick={this.handleClick}
      >
        {this.props.children}
      </ToggleKnappPure>
    );
  }
}

(ToggleKnapp as React.ComponentClass).propTypes = {
  /**
   * Pressed state
   */
  pressed: PT.bool,
  /**
   * Kompakt versjon
   */
  kompakt: PT.bool,
  /**
   * onClick callback som returnerer pressed state
   */
  onChange: PT.func,
};

export default ToggleKnapp;
