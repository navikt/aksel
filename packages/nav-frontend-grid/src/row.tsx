import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import "nav-frontend-grid-style";

const cls = (className) => classNames("row", className, {});

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

class Row extends React.Component<RowProps> {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <div className={cls(className)} {...props}>
        {children}
      </div>
    );
  }
}

(Row as React.ComponentClass).defaultProps = {
  className: undefined,
  children: undefined,
};

(Row as React.ComponentClass).propTypes = {
  className: PT.string,
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
};

export default Row;
