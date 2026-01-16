import React, { forwardRef, useRef } from "react";
import type { AkselColor } from "../types";
import { cl } from "../util/className";
import { useControllableState } from "../util/hooks";
import { OverridableComponent } from "../util/types";
import ExpansionCardContent, {
  ExpansionCardContentProps,
} from "./ExpansionCardContent";
import {
  ExpansionCardDescription,
  ExpansionCardDescriptionProps,
} from "./ExpansionCardDescription";
import ExpansionCardHeader, {
  ExpansionCardHeaderProps,
} from "./ExpansionCardHeader";
import {
  ExpansionCardTitle,
  ExpansionCardTitleProps,
} from "./ExpansionCardTitle";
import { ExpansionCardContext } from "./context";

interface ExpansionCardComponent
  extends React.ForwardRefExoticComponent<
    ExpansionCardProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link ExpansionCardHeaderProps}
   */
  Header: React.ForwardRefExoticComponent<
    ExpansionCardHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * @see 🏷️ {@link ExpansionCardTitleProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: OverridableComponent<ExpansionCardTitleProps, HTMLHeadingElement>;
  /**
   * @see 🏷️ {@link ExpansionCardDescriptionProps}
   */
  Description: React.ForwardRefExoticComponent<
    ExpansionCardDescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;
  /**
   * @see 🏷️ {@link ExpansionCardContentProps}
   */
  Content: React.ForwardRefExoticComponent<
    ExpansionCardContentProps & React.RefAttributes<HTMLDivElement>
  >;
}

interface ExpansionCardCommonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  children: React.ReactNode;
  /**
   * Callback for when Card is toggled open/closed
   */
  onToggle?: (open: boolean) => void;
  /**
   * Controlled open-state
   * Using this removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults to open if not controlled
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

export type ExpansionCardProps = ExpansionCardCommonProps &
  ExpansionCardConditionalProps;

/**
 * A component that displays an expandable card.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/expansioncard)
 * @see 🏷️ {@link ExpansionCardProps}
 *
 * @example
 * ```jsx
 * <ExpansionCard aria-label="default-demo">
 *   <ExpansionCard.Header>
 *     <ExpansionCard.Title>Utbetaling av sykepenger</ExpansionCard.Title>
 *   </ExpansionCard.Header>
 *   <ExpansionCard.Content>
 *     <Innhold />
 *   </ExpansionCard.Content>
 * </ExpansionCard>
 * ```
 */
export const ExpansionCard = forwardRef<HTMLDivElement, ExpansionCardProps>(
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
    const shouldFade = useRef<boolean>(!(Boolean(open) || defaultOpen));

    const [_open, _setOpen] = useControllableState({
      value: open,
      onChange: (newValue) => {
        onToggle?.(newValue);
        shouldFade.current = true;
      },
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
            {
              "aksel-expansioncard--no-animation": !shouldFade.current,
            },
          )}
          ref={ref}
        />
      </ExpansionCardContext.Provider>
    );
  },
) as ExpansionCardComponent;

ExpansionCard.Header = ExpansionCardHeader;
ExpansionCard.Content = ExpansionCardContent;
ExpansionCard.Title = ExpansionCardTitle;
ExpansionCard.Description = ExpansionCardDescription;

export default ExpansionCard;
