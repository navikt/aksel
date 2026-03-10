import React, { forwardRef } from "react";
import type { AkselColor } from "../../../types";
import { BodyLong } from "../../../typography";
import { cl } from "../../../utils/helpers";

interface InfoCardMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Changes the HTML element used for the root element.
   *
   * **When using `section`, provide either `aria-label` or `aria-labelledby` for better accessibility.**
   * `axe-core` might warn about unique landmarks if you have multiple InfoCards on page with the same label.
   * In those cases consider updating to unique `aria-label` or `aria-labelledby` props.
   * @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique)
   * @default "div"
   */
  as?: "div" | "section";
  /**
   * Changes the size.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Icon to display in message.
   */
  icon: React.ReactNode;
  /**
   * Overrides inherited color.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
}

/**
 * A component for displaying informational messages.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/infocard)
 * @see 🏷️ {@link InfoCardMessageProps}
 * @example
 * ```jsx
 *  <InfoCard data-color="info" icon={<InformationSquareIcon aria-hidden />}>
 *    Message contents
 *  </InfoCard>
 * ```
 */
const InfoCardMessage = forwardRef<HTMLDivElement, InfoCardMessageProps>(
  (
    {
      children,
      className,
      "data-color": dataColor = "info",
      as: Component = "div",
      icon,
      size = "medium",
      ...restProps
    }: InfoCardMessageProps,
    forwardedRef,
  ) => {
    return (
      <Component
        ref={forwardedRef}
        data-color={dataColor}
        className={cl("aksel-base-alert__message", className)}
        data-size={size}
        {...restProps}
      >
        <div className="aksel-base-alert__icon">{icon}</div>
        <BodyLong size={size}>{children}</BodyLong>
      </Component>
    );
  },
);

export { InfoCardMessage };
export type { InfoCardMessageProps };
