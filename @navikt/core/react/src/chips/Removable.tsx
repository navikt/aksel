import cl from "clsx";
import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useI18n } from "../util/i18n/i18n.context";
import { ComponentTranslation } from "../util/i18n/i18n.types";

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
  /**
   * Replaces label read for screen-readers
   * @default "slett"
   * @deprecated Use `translations` instead
   */
  removeLabel?: string;
  /**
   * i18n API for customizing texts and labels.
   */
  translations?: ComponentTranslation<"Chips">["Removable"];
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
      removeLabel,
      translations,
      className,
      onClick,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const translate = useI18n("Chips", { Removable: translations });
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={cl(
          "navds-chips__chip navds-chips__removable navds-chips--icon-right",
          className,
          `navds-chips__removable--${variant}`,
        )}
        aria-label={`${children} ${
          removeLabel ?? translate("Removable.labelSuffix")
        }`}
        onClick={composeEventHandlers(onClick, onDelete)}
      >
        <span className="navds-chips__chip-text">{children}</span>
        <span className="navds-chips__removable-icon">
          <XMarkIcon aria-hidden />
        </span>
      </button>
    );
  },
);

export default RemovableChips;
