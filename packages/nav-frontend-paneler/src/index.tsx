import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import "nav-frontend-paneler-style";

const cls = (className, border) =>
  classNames("panel", className, {
    "panel--border": border,
  });

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gir komponenten en grå border
   */
  border?: boolean;
}

class Panel extends React.Component<PanelProps> {
  static defaultProps: Partial<PanelProps> = {
    border: false,
  };

  render() {
    const { children, className, border, ...props } = this.props;
    return (
      <div className={cls(className, border)} {...props}>
        {children}
      </div>
    );
  }
}

(Panel as React.ComponentClass).propTypes = {
  border: PT.bool,
};
(Panel as React.ComponentClass).defaultProps = {
  border: false,
};

export default Panel;
