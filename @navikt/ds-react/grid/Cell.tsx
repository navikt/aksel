import PropTypes from "prop-types";
import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @ignore
   */
  className: string;
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Cell columns on width < 448px
   */
  xs: Column;
  /**
   * Cell columns on min-width: 448
   */
  sm?: Column;
  /**
   * Cell columns on min-width: 648
   */
  md?: Column;
  /**
   * Cell columns on min-width: 960px
   */
  lg?: Column;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, xs, sm, md, lg, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-grid__cell",
          xs && `navds-grid__cell--xs-${xs}`,
          sm && `navds-grid__cell--sm-${sm}`,
          md && `navds-grid__cell--md-${md}`,
          lg && `navds-grid__cell--lg-${lg}`,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
Cell.propTypes = {
  /**
   * Component content
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.any,
  /**
   * Cell columns on width < 448px
   */
  xs: PropTypes.oneOf<Column>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    .isRequired,
  /**
   * Cell columns on min-width: 448
   */
  sm: PropTypes.oneOf<Column>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Cell columns on min-width: 648
   */
  md: PropTypes.oneOf<Column>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Cell columns on min-width: 960px
   */
  lg: PropTypes.oneOf<Column>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

export default Cell;
