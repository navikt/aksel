import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";

import "nav-frontend-lukknapp-style";

const cls = (bla, hvit, hjorne, className) =>
  classNames(
    "lukknapp",
    {
      "lukknapp--hvit": hvit,
      "lukknapp--bla": bla,
      "lukknapp--overstHjorne": hjorne,
    },
    className
  );

export interface LukknappProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Blå variant
   */
  bla?: boolean;
  /**
   * Hvit variant
   */
  hvit?: boolean;
  /**
   * Plasser knappen øverst i høyre hjørne.
   * Knappen er absolut possisjonert og trenger derfor litt hjelp med å legge seg riktig sted.
   */
  overstHjorne?: boolean;
  /**
   * Egendefinert klassenavn
   */
  className?: string;
  /**
   * @deprecated Bruk children i stedet.
   */
  ariaLabel?: string;
}

/**
 * Lukknapp
 */
class Lukknapp extends React.Component<LukknappProps, {}> {
  static defaultProps: Partial<LukknappProps> = {
    children: "Lukk",
    bla: false,
    hvit: false,
    overstHjorne: false,
  };

  buttonRef!: HTMLButtonElement;

  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    if (this.buttonRef) {
      this.buttonRef.focus();
    }
  }

  render() {
    const {
      children,
      bla,
      hvit,
      overstHjorne,
      className,
      ariaLabel,
      ...props
    } = this.props;
    return (
      <button
        ref={(buttonRef: HTMLButtonElement) => {
          this.buttonRef = buttonRef;
        }}
        className={cls(bla, hvit, overstHjorne, className)}
        aria-label={ariaLabel}
        {...props}
      >
        <span className="text-hide">{children}</span>
      </button>
    );
  }
}

(Lukknapp as any).defaultProps = {
  children: "Lukk",
  bla: false,
  hvit: false,
  overstHjorne: false,
};

(Lukknapp as any).propTypes = {
  /**
   * Tekst som beskriver knappen for skjermleser
   */
  children: PT.string,
  /**
   * Blå variant
   */
  bla: PT.bool,
  /**
   * Hvit variant
   */
  hvit: PT.bool,
  /**
   * Plasser knappen øverst i høyre hjørne.
   * Knappen er absolut possisjonert og trenger derfor litt hjelp med å legge seg riktig sted.
   */
  overstHjorne: PT.bool,
  /**
   * Egendefinert klassenavn
   */
  className: PT.string,
  /**
   * @deprecated Bruk children i stedet.
   */
  ariaLabel: PT.string,
};

export default Lukknapp;
