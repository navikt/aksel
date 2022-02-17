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
   * Predefined variants for PageHeader
   * @default "guide"
   */
  variant?: "situation" | "product" | "guide";
  /**
   * Decides how to align content
   * @default "left"
   */
  align?: "left" | "center";
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      children,
      className,
      illustration,
      description,
      variant = "guide",
      align = "left",
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
          `navds-page-header--${variant}`,
          `navds-page-header--${align}`
        )}
        {...rest}
      >
        {illustration && (
          <div className="navds-page-header__illustration">{illustration}</div>
        )}
        <div className="navds-page-header__wrapper">
          <Heading className="navds-page-header__title" size="xlarge" level="1">
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
