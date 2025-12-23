import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../../theme/Theme";

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
    const { cn } = useRenameCSS();
    const themeContext = useThemeInternal();

    return (
      <div
        ref={forwardedRef}
        data-color={themeContext?.color}
        {...restProps}
        className={cn(className, "navds-base-alert__content")}
      >
        {children}
      </div>
    );
  },
);

export { BaseAlertContent };
export type { BaseAlertContentProps };
