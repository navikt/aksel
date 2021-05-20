import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import "nav-frontend-lenkepanel-style";

const cls = (className, border) =>
  classNames("lenkepanel", className, {
    "lenkepanel--border": border,
  });

export interface LenkepanelBaseProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Klassenavn
   */
  className?: string;
  /**
   * Lenke (denne sendes som prop til linkCreator)
   */
  href: string;
  /**
   * Tekstinnhold for lenkepanel
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Funksjon som brukes for å lage lenken. her kan du spessifisere din egen hvis du f.eks. bruker React Router
   */
  linkCreator?: (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement>
  ) => React.ReactNode;
  /**
   * Hvis komponenten skal brukes på hvit bakgrunn kan denne brukes for å gi den en border
   */
  border?: boolean;
}

class LenkepanelBase extends React.Component<LenkepanelBaseProps> {
  static defaultProps: Partial<LenkepanelBaseProps> = {
    border: false,
  };

  render() {
    const {
      className,
      children,
      linkCreator = (props) => <a {...props}>{props.children}</a>,
      border,
      ...renderProps
    } = this.props;

    return linkCreator({
      ...renderProps,
      className: cls(className, border),
      children: [
        children,
        <span key="indikator" className="lenkepanel__indikator" />,
      ],
    });
  }
}

(LenkepanelBase as React.ComponentClass).propTypes = {
  /**
   * Klassenavn
   */
  className: PT.string,
  /**
   * Lenke (denne sendes som prop til linkCreator)
   */
  href: PT.string.isRequired,
  /**
   * Tekstinnhold for lenkepanel
   */
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
  /**
   * Funksjon som brukes for å lage lenken. her kan du spessifisere din egen hvis du f.eks. bruker React Router
   */
  linkCreator: PT.func,
  /**
   * Hvis komponenten skal brukes på hvit bakgrunn kan denne brukes for å gi den en border
   */
  border: PT.bool,
};

(LenkepanelBase as React.ComponentClass).defaultProps = {
  className: undefined,
  linkCreator: (props) => <a {...props}>{props.children}</a>,
  border: false,
};

export default LenkepanelBase;
