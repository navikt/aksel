import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useI18n } from "../util/i18n/i18n.hooks";

export interface ChipsRemovableProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  /**
   * Chip-variants
   * @default "action"
   */
  variant?: "action" | "neutral";
  /**
   * Click callback
   */
  onDelete?: () => void;
}

export const RemovableChips = forwardRef<
  HTMLButtonElement,
  ChipsRemovableProps
>(
  (
    {
      children,
      variant = "action",
      onDelete,
      className,
      onClick,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const translate = useI18n("Chips");
    const { cn } = useRenameCSS();

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={cn(
          "navds-chips__chip navds-chips__removable navds-chips--icon-right",
          className,
          `navds-chips__removable--${variant}`,
        )}
        aria-label={`${children} ${translate("Removable.labelSuffix")}`}
        onClick={composeEventHandlers(onClick, onDelete)}
      >
        <span className={cn("navds-chips__chip-text")}>{children}</span>
        <span className={cn("navds-chips__removable-icon")}>
          <XMarkIcon aria-hidden />
        </span>
      </button>
    );
  },
);

export default RemovableChips;
