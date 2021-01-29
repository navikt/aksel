import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import Ikoner from "nav-frontend-ikoner-assets";
import "nav-frontend-spinner-style";

const cls = (className, storrelse) =>
  classNames("spinner", className, {
    [`spinner--${storrelse.toLowerCase()}`]: !!storrelse,
  });

export interface NavFrontendSpinnerProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  /**
   * Gjennomsiktig bakgrunn
   */
  transparent?: boolean;
  /**
   * Classname
   */
  className?: string;
  /**
   * -
   */
  "aria-label"?: string;
}

export interface NavFrontendSpinnerBaseProps extends NavFrontendSpinnerProps {
  type?: "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
}

class NavFrontendSpinner extends React.Component<NavFrontendSpinnerBaseProps> {
  render() {
    const { transparent, type, className, ...props } = this.props;

    const ikon = transparent ? "spinner-transparent" : "spinner-negativ";

    return (
      <Ikoner kind={ikon as any} className={cls(className, type)} {...props} />
    );
  }
}

(NavFrontendSpinner as React.ComponentClass).propTypes = {
  transparent: PT.bool,
  type: PT.oneOf(["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]),
  className: PT.string,
  "aria-label": PT.string,
};

(NavFrontendSpinner as React.ComponentClass).defaultProps = {
  "aria-label": "Laster innhold",
  transparent: false,
  type: "M",
  className: undefined,
};

export default NavFrontendSpinner;
