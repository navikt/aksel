import React, { forwardRef } from "react";
import { BodyLong } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { BaseAlert } from "../../base-alert";

type InfoCardMessageProps = Omit<
  BaseAlert.RootProps,
  "type" | "global" | "status" | "as"
> & {
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
   * Icon to display in message.
   */
  icon: React.ReactNode;
};

/**
 * A component for displaying informational content in a card format.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/infocard)
 * @see 🏷️ {@link InfoCardProps}
 * @example
 * ```jsx
 *  <InfoCard data-color="info">
 *    <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
 *      <InfoCard.Title>Info title</InfoCard.Title>
 *    </InfoCard.Header>
 *    <InfoCard.Content>Content</InfoCard.Content>
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
