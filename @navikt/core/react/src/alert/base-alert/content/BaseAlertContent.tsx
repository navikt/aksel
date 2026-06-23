import React, { forwardRef } from "react";
import { useThemeInternal } from "../../../theme/Theme";
import { BodyLong } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { useBaseAlert } from "../root/BaseAlertRoot.context";

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
    const { size } = useBaseAlert();

    return (
      <BodyLong
        as="div"
        ref={forwardedRef}
        data-color={themeContext?.color}
        size={size}
        {...restProps}
        className={cl(className, "aksel-base-alert__content")}
      >
        {children}
      </BodyLong>
    );
  },
);

export { BaseAlertContent };
export type { BaseAlertContentProps };
