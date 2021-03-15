import PropTypes from "prop-types";
import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface InternalHeaderUserProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * user name
   */
  name: string;
  /**
   * user ident
   */
  ident: string;
}

const InternalHeaderUser = forwardRef<HTMLDivElement, InternalHeaderUserProps>(
  ({ className, name, ident, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-header__user", className)} {...rest}>
      <span className="navds-header__name">{name}</span>
      <span className="navds-header__ident">{ident}</span>
    </div>
  )
);

InternalHeaderUser.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * User ident
   */
  ident: PropTypes.string.isRequired,
  /**
   * user name
   */
  name: PropTypes.string.isRequired,
};

export default InternalHeaderUser;
