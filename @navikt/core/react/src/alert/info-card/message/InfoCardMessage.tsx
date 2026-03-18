import React, { forwardRef } from "react";
import { BodyLong } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { useBaseAlert } from "../../base-alert/root/BaseAlertRoot.context";

interface InfoCardMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display in message.
   */
  icon: React.ReactNode;
}

/**
 * A component for displaying informational messages.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/infocard)
 * @see 🏷️ {@link InfoCardMessageProps}
 * @example
 * ```jsx
 * <InfoCard data-color="info">
 *   <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
 *     Message contents
 *   </InfoCard.Message>
 * </InfoCard>
 * ```
 */
const InfoCardMessage = forwardRef<HTMLDivElement, InfoCardMessageProps>(
  (
    { children, className, icon, ...restProps }: InfoCardMessageProps,
    forwardedRef,
  ) => {
    const context = useBaseAlert();
    return (
      <div
        ref={forwardedRef}
        className={cl(className, "aksel-base-alert__message")}
        data-size={context.size}
        {...restProps}
      >
        <div className="aksel-base-alert__icon">{icon}</div>
        <BodyLong size={context.size} as="div" textColor="default">
          {children}
        </BodyLong>
      </div>
    );
  },
);

export { InfoCardMessage };
export type { InfoCardMessageProps };
