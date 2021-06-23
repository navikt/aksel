import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Header title
   */
  children: string;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Pictogram placed in header
   */
  illustration?: React.ReactNode;
  /**
   * Short text placed under title
   */
  description?: string;
  /**
   * Decides how to align content
   * @default "left"
   */
  variant?: "left" | "center";
  /**
   * Predefined theming for header
   * @default "guide"
   */
  theme?: "situation" | "product" | "guide";
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      children,
      className,
      illustration,
      description,
      theme = "guide",
      variant = "left",
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-header",
          className,
          `navds-header--${theme}`,
          `navds-header--${variant}`
        )}
        {...rest}
      >
        {illustration && (
          <div className="navds-header__illustration">{illustration}</div>
        )}
        <div className="navds-header__wrapper">
          <h1 className="navds-header__title navds-title navds-title--2xl">
            {children}
          </h1>
          {description && (
            <p className="navds-body-short navds-body--s">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

export default Header;
