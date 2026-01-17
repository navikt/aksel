import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { AkselColor } from "../types";
import { cl } from "../util/className";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useI18n } from "../util/i18n/i18n.hooks";

export interface ChipsRemovableProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  /**
   * @deprecated Use `data-color` prop instead.
   */
  variant?: "action" | "neutral";
  /**
   * Click callback
   */
  onDelete?: () => void;
  /**
   * Overrides inherited color.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
}

export const RemovableChips = forwardRef<
  HTMLButtonElement,
  ChipsRemovableProps
>(
  (
    {
      children,
      variant,
      onDelete,
      className,
      onClick,
      type = "button",
      "data-color": color,
      ...rest
    },
    ref,
  ) => {
    const translate = useI18n("Chips");

    return (
      <button
        data-color={color ?? variantToColor(variant)}
        {...rest}
        ref={ref}
        type={type}
        className={cl(
          "aksel-chips__chip aksel-chips__removable aksel-chips--icon-right",
          className,
        )}
        aria-label={`${children} ${translate("Removable.labelSuffix")}`}
        onClick={composeEventHandlers(onClick, onDelete)}
      >
        <span className="aksel-chips__chip-text">{children}</span>
        <span className="aksel-chips__removable-icon">
          <XMarkIcon aria-hidden />
        </span>
      </button>
    );
  },
);

function variantToColor(
  variant?: ChipsRemovableProps["variant"],
): AkselColor | undefined {
  switch (variant) {
    case "action":
      return "accent";
    case "neutral":
      return "neutral";
    default:
      return undefined;
  }
}

export default RemovableChips;
