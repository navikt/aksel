import * as React from "react";
import * as PT from "prop-types";
import { omit } from "nav-frontend-js-utils";

import ToggleGruppePure from "./toggle-gruppe-pure";
import {
  ToggleKnappPureProps,
  ToggleKnappPurePropsShape,
} from "./toggle-knapp-pure";

export interface ToggleGruppeProps {
  /**
   * Array av toggle knapper, se `toggle-knapp-pure.tsx`
   */
  defaultToggles: ToggleKnappPureProps[];
  /**
   * Egendefinert klassenavn.
   */
  className?: string;
  /**
   * Hvis `true` vil det være mulig å velge flere knapper om gangen.
   */
  multiSelect?: boolean;
  /**
   * Hvis 'true' reduseres høyre/venstre-padding på knappene betraktelig.
   */
  kompakt?: boolean;
  /**
   * Custom onChange handler
   */
  onChange?: (
    event: React.SyntheticEvent<EventTarget>,
    toggles: ToggleKnappPureProps[]
  ) => void;
  /**
   * Hvis 'true' så må minst 1 toggleknapp alltid være presset
   */
  minstEn?: boolean;
}

export interface ToggleGruppeState {
  active: boolean[];
}

class ToggleGruppe extends React.Component<
  ToggleGruppeProps,
  ToggleGruppeState
> {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.defaultToggles.map(
        ({ pressed }, index, array) =>
          pressed ||
          (!!this.props.minstEn &&
            index === 0 &&
            array.every((toggle) => !toggle.pressed))
      ),
    };
  }

  handleClick = (e, index, customOnClick) => {
    if (typeof customOnClick === "function") customOnClick(e);

    const newActive = this.state.active.map((active, i, array) => {
      if (this.props.multiSelect) {
        if (
          this.props.minstEn &&
          array.filter(Boolean).length === 1 &&
          array.indexOf(true) === index
        ) {
          return active;
        }
        return i === index ? !active : active;
      }
      if (this.props.minstEn) {
        return i === index;
      }
      return i === index ? !active : false;
    });

    this.setState({
      active: newActive,
    });

    if (typeof this.props.onChange === "function") {
      this.props.onChange(
        e,
        this.props.defaultToggles.map((props, i) => ({
          ...props,
          pressed: newActive[i],
        }))
      );
    }
  };

  render() {
    const renderProps = omit(
      this.props,
      "children",
      "multiSelect",
      "toggles",
      "minstEn"
    );
    const toggles = this.props.defaultToggles.map((toggle, i) => ({
      ...toggle,
      pressed: this.state.active[i],
      kompakt: this.props.kompakt,
      onClick: (e) => this.handleClick(e, i, toggle.onClick),
    }));

    return <ToggleGruppePure {...renderProps} toggles={toggles} />;
  }
}

(ToggleGruppe as React.ComponentClass).propTypes = {
  /**
   * Array av toggle knapper, se `toggle-knapp-pure.tsx`
   */
  defaultToggles: PT.arrayOf(ToggleKnappPurePropsShape).isRequired,
  /**
   * Egendefinert klassenavn.
   */
  className: PT.string,
  /**
   * Hvis `true` vil det være mulig å velge flere knapper om gangen.
   */
  multiSelect: PT.bool,
  /**
   * Hvis 'true' reduseres høyre/venstre-padding på knappene betraktelig.
   */
  kompakt: PT.bool,
  /**
   * Custom onChange handler
   */
  onChange: PT.func,
  /**
   * Hvis 'true' så må minst 1 toggleknapp alltid være presset
   */
  minstEn: PT.bool,
};

export default ToggleGruppe;
