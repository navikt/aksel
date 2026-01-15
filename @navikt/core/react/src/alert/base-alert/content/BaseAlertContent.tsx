import React, { forwardRef } from "react";
import { useThemeInternal } from "../../../theme/Theme";
import { cl } from "../../../util/className";

interface BaseAlertContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link BaseAlertContentProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title>Info title</BaseAlert.Title>
 *    </BaseAlert.Header>
 *
 *    <BaseAlert.Content>Content</BaseAlert.Content>
 *  </BaseAlert>
 * ```
 */
const BaseAlertContent = forwardRef<HTMLDivElement, BaseAlertContentProps>(
  (
    { children, className, ...restProps }: BaseAlertContentProps,
    forwardedRef,
  ) => {
    const themeContext = useThemeInternal();

    return (
      <div
        ref={forwardedRef}
        data-color={themeContext?.color}
        {...restProps}
        className={cl(className, "aksel-base-alert__content")}
      >
        {children}
      </div>
    );
  },
);

export { BaseAlertContent };
export type { BaseAlertContentProps };
