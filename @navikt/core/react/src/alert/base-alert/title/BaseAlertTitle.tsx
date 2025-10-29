import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { BodyShort } from "../../../typography";
import { useBaseAlert } from "../root/BaseAlertRoot.context";

interface BaseAlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes the HTML element used for the title.
   * @default "h2"
   */
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Title component for BaseAlert. Remember to use correct heading-level with the `as` prop.
 * @see 🏷️ {@link BaseAlertTitleProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title as="h2">Info tittel</BaseAlert.Title>
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertTitle = forwardRef<HTMLHeadingElement, BaseAlertTitleProps>(
  (
    { children, className, as = "h2", ...restProps }: BaseAlertTitleProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const { size } = useBaseAlert();

    return (
      <BodyShort
        ref={forwardedRef}
        {...restProps}
        as={as}
        size={size === "medium" ? "large" : "medium"}
        weight="semibold"
        className={cn(className, "navds-base-alert__title")}
      >
        {children}
      </BodyShort>
    );
  },
);

export { BaseAlertTitle };
export type { BaseAlertTitleProps };
