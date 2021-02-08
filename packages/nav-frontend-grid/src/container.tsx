import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import "nav-frontend-grid-style";

const cls = (fluid, className) =>
  classNames(className, {
    container: fluid === false,
    "container-fluid": fluid === true,
  });

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  fluid?: boolean;
}

class Container extends React.Component<ContainerProps> {
  render() {
    const { children, className, fluid, ...props } = this.props;
    return (
      <div className={cls(fluid, className)} {...props}>
        {children}
      </div>
    );
  }
}

(Container as React.ComponentClass).defaultProps = {
  className: undefined,
  children: undefined,
  fluid: false,
};

(Container as React.ComponentClass).propTypes = {
  className: PT.string,
  fluid: PT.bool,
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
};

export default Container;
