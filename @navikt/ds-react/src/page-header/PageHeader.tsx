import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Heading } from "..";

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * PageHeader title
   */
  children: string;
  /**
   * Pictogram placed in PageHeader
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
   * Predefined theming for PageHeader
   * @default "guide"
   */
  theme?: "situation" | "product" | "guide";
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
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
          "navds-page-header",
          className,
          `navds-page-header--${theme}`,
          `navds-page-header--${variant}`
        )}
        {...rest}
      >
        {illustration && (
          <div className="navds-page-header__illustration">{illustration}</div>
        )}
        <div className="navds-page-header__wrapper">
          <Heading
            className="navds-page-header__title"
            size="2xlarge"
            level="1"
          >
            {children}
          </Heading>
          {description && (
            <BodyShort className="navds-page-header__description">
              {description}
            </BodyShort>
          )}
        </div>
      </div>
    );
  }
);

export default PageHeader;
