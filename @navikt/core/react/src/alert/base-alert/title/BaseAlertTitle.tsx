import React, { forwardRef } from "react";
import { BodyShort } from "../../../typography";
import { useId } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useBaseAlert } from "../root/BaseAlertRoot.context";

interface BaseAlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes the HTML element used for the title.
   * @default "h2"
   */
  as?: "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

/**
 * Title component for BaseAlert. Remember to use correct heading-level with the `as` prop.
 * @see 🏷️ {@link BaseAlertTitleProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title as="h2">Info title</BaseAlert.Title>
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertTitle = forwardRef<HTMLHeadingElement, BaseAlertTitleProps>(
  (
    {
      children,
      className,
      as = "h2",
      id: idProp,
      ...restProps
    }: BaseAlertTitleProps,
    forwardedRef,
  ) => {
    const { size, statusId } = useBaseAlert();

    const titleId = useId(idProp);

    return (
      <BodyShort
        ref={forwardedRef}
        {...restProps}
        as={as}
        size={size === "medium" ? "large" : "medium"}
        weight="semibold"
        className={cl(className, "aksel-base-alert__title")}
        id={titleId}
        aria-labelledby={statusId ? cl(statusId, titleId) : undefined}
      >
        {children}
      </BodyShort>
    );
  },
);

export { BaseAlertTitle };
export type { BaseAlertTitleProps };
