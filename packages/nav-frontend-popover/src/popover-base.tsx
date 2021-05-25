/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from "react";
import classnames from "classnames";

import "nav-frontend-popover-style";

// tslint:disable-next-line:max-line-length
export enum PopoverOrientering {
  Over = "over",
  OverVenstre = "over-venstre",
  OverHoyre = "over-hoyre",
  Under = "under",
  UnderVenstre = "under-venstre",
  UnderHoyre = "under-hoyre",
  Venstre = "venstre",
  Hoyre = "hoyre",
}

const cls = (props) =>
  classnames("popover", props.className, {
    "popover--over":
      [
        PopoverOrientering.Over,
        PopoverOrientering.OverVenstre,
        PopoverOrientering.OverHoyre,
      ].indexOf(props.orientering) !== -1,
    "popover--under":
      [
        PopoverOrientering.Under,
        PopoverOrientering.UnderVenstre,
        PopoverOrientering.UnderHoyre,
      ].indexOf(props.orientering) !== -1,
    "popover--venstre": props.orientering === PopoverOrientering.Venstre,
    "popover--hoyre": props.orientering === PopoverOrientering.Hoyre,
    "popover--uten-pil": props.utenPil,
  });

export interface PopoverBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Egendefinert klassenavn.
   */
  className?: string;
  /**
   * Orientering i forhold til anker. Bestemmer hvordan pilen skal posisjoneres i forhold til Popover-vinduet.
   * Brukes også av Popover for å bestemme hvordan Popover-vinduet skal posisjoneres i forhold til ankeret.
   * Mulige verdier: `over`, `over-venstre`, `over-hoyre`, `under`, `under-venstre`, `under-hoyre`, `venstre`,
   * `hoyre`
   */
  orientering?: PopoverOrientering;
  /**
   * CSS-stiler for absolutt posisjonering av popover vindu og pil. Brukes av Popover for dynamisk
   * justering av posisjon ved resize og scroll.
   */
  posisjon?: PopoverPosisjonShape;
  /**
   * Bestemmer om pilen skal rendres eller ikke.
   */
  utenPil?: boolean;
  /**
   * React-referanse til intern `<div>`
   */
  innerRef?: React.RefObject<HTMLDivElement>;
}

export interface PopoverPosisjonShape {
  left?: number;
  top?: number;
  pilLeft?: number;
}

class PopoverBase extends React.PureComponent<PopoverBaseProps> {
  static defaultProps: Partial<PopoverBaseProps> = {
    orientering: PopoverOrientering.Over,
    posisjon: {
      left: 0,
      top: 0,
    },
  };

  render() {
    const {
      children,
      className,
      posisjon,
      orientering,
      utenPil,
      innerRef,
      ...rest
    } = this.props;

    const stiler = {
      transform: `translate3d(${posisjon!.left}px, ${posisjon!.top}px, 0)`,
    };

    let pilStiler;
    if (
      [PopoverOrientering.Hoyre, PopoverOrientering.Venstre].indexOf(
        this.props.orientering!
      ) === -1
    ) {
      pilStiler = { left: this.props.posisjon!.pilLeft };
    }

    return (
      <div
        className={cls(this.props)}
        style={stiler}
        onClick={(e) => e.stopPropagation()}
        ref={innerRef}
        {...rest}
      >
        <div className="popover__content-inner">{children}</div>
        {!this.props.utenPil && (
          <span className="popover__pil" style={pilStiler} />
        )}
      </div>
    );
  }
}

export default PopoverBase;
