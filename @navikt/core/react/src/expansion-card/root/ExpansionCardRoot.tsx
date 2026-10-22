import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { cl } from "../../utils/helpers";
import { useControllableState } from "../../utils/hooks";
import {
  ExpansionCardContent,
  type ExpansionCardContentProps,
} from "../content/ExpansionCardContent";
import {
  ExpansionCardDescription,
  type ExpansionCardDescriptionProps,
} from "../description/ExpansionCardDescription";
import {
  ExpansionCardHeader,
  type ExpansionCardHeaderProps,
} from "../header/ExpansionCardHeader";
import {
  ExpansionCardTitle,
  type ExpansionCardTitleProps,
} from "../title/ExpansionCardTitle";
import { ExpansionCardContext } from "./ExpansionCardRoot.context";

interface ExpansionCardCommonProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onToggle"
> {
  children: React.ReactNode;
  /**
   * Callback for when Card is opened/closed.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Controlled open-state.
   *
   * Using this removes automatic control of open-state.
   */
  open?: boolean;
  /**
   * The open state when initially rendered. Use when you do not need to control the open state.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Overrides inherited color.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
}

type ExpansionCardConditionalProps =
  | {
      /**
       * Should be set if not using 'aria-labelledby'
       */
      "aria-label": string;
    }
  | {
      /**
       * Should be set if not using 'aria-label'
       */
      "aria-labelledby": string;
    };

type ExpansionCardProps = ExpansionCardCommonProps &
  ExpansionCardConditionalProps;

const ExpansionCardRoot = forwardRef<HTMLDivElement, ExpansionCardProps>(
  (
    {
      className,
      onToggle,
      open,
      defaultOpen = false,
      size = "medium",
      "data-color": color = "neutral",
      ...rest
    },
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      value: open,
      onChange: onToggle,
      defaultValue: defaultOpen,
    });

    return (
      <ExpansionCardContext.Provider
        value={{
          open: open ?? _open,
          toggleOpen: () => _setOpen((x) => !x),
          size,
        }}
      >
        <section
          data-color={color}
          {...rest}
          className={cl(
            "aksel-expansioncard",
            className,
            `aksel-expansioncard--${size}`,
          )}
          ref={ref}
        />
      </ExpansionCardContext.Provider>
    );
  },
);

/**
 * A component that displays an expandable card.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/expansioncard)
 * @see 🏷️ {@link ExpansionCardProps}
 *
 * @example
 * ```jsx
 * <ExpansionCard aria-label="Utbetaling av sykepenger">
 *   <ExpansionCard.Header>
 *     <ExpansionCard.Title>Utbetaling av sykepenger</ExpansionCard.Title>
 *   </ExpansionCard.Header>
 *   <ExpansionCard.Content>
 *     <Innhold />
 *   </ExpansionCard.Content>
 * </ExpansionCard>
 * ```
 */
const ExpansionCard = Object.assign(ExpansionCardRoot, {
  /**
   * @see 🏷️ {@link ExpansionCardHeaderProps}
   */
  Header: ExpansionCardHeader,
  /**
   * @see 🏷️ {@link ExpansionCardTitleProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: ExpansionCardTitle,
  /**
   * @see 🏷️ {@link ExpansionCardDescriptionProps}
   */
  Description: ExpansionCardDescription,
  /**
   * @see 🏷️ {@link ExpansionCardContentProps}
   */
  Content: ExpansionCardContent,
});

export {
  ExpansionCard,
  ExpansionCardHeader,
  ExpansionCardTitle,
  ExpansionCardDescription,
  ExpansionCardContent,
};
export type {
  ExpansionCardProps,
  ExpansionCardHeaderProps,
  ExpansionCardTitleProps,
  ExpansionCardDescriptionProps,
  ExpansionCardContentProps,
};
