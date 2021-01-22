import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import Link, { LinkProps } from "./Link";
import "@navikt/ds-css/internal-header/index.css";
import "@navikt/ds-css/typography/index.css";

export interface InternalHeaderTitleProps
  extends HTMLAttributes<HTMLElement>,
    LinkProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

const InternalHeaderTitle = forwardRef<HTMLElement, InternalHeaderTitleProps>(
  (props, ref) =>
    props.element || props.href ? (
      <Link
        {...props}
        className={cl("navds-header__title", props.className)}
        ref={ref}
        element={props.element}
      >
        <h1>
          <span>{props.children}</span>
        </h1>
      </Link>
    ) : (
      <span
        {...props}
        ref={ref}
        className={cl("navds-header__title", props.className)}
      >
        <h1>
          <span>{props.children}</span>
        </h1>
      </span>
    )
);

export default InternalHeaderTitle;
