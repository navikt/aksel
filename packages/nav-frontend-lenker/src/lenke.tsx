import * as React from "react";
import classnames from "classnames";
import "nav-frontend-lenker-style";

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * -
   */
  href: string;
  /**
   * -
   */
  target?: string;
  /**
   * -
   */
  ariaLabel?: string;
  /**
   * -
   */
  className?: string;
}

const getRelFromTarget = (target) => {
  if (
    !target ||
    target.toLowerCase() === "_self" ||
    target.toLowerCase() === "_top" ||
    target.toLowerCase() === "_parent"
  ) {
    return undefined;
  }
  return "noopener";
};

const cls = (className) => classnames("lenke", className);

class Lenke extends React.Component<Props> {
  render() {
    const {
      href,
      target,
      ariaLabel,
      children,
      className,
      ...rest
    } = this.props;
    return (
      <a
        href={href}
        target={target}
        rel={getRelFromTarget(target)}
        className={cls(className)}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </a>
    );
  }
}

export default Lenke;
