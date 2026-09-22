import React, { forwardRef, useRef } from "react";
import type { AkselColor } from "../../types";
import { cl } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { ExpansionCardContent } from "../content/ExpansionCardContent";
import { ExpansionCardDescription } from "../description/ExpansionCardDescription";
import { ExpansionCardHeader } from "../header/ExpansionCardHeader";
import { ExpansionCardTitle } from "../title/ExpansionCardTitle";
import { ExpansionCardProvider } from "./ExpansionCardRoot.context";

interface ExpansionCardProps extends Omit<
  React.DetailsHTMLAttributes<HTMLDetailsElement>,
  "onToggle" // Omitted to avoid confusion since old ExpansionCard also has an onToggle prop
> {
  children: React.ReactNode;
  /**
   * Callback for when card is opened/closed.
   */
  onOpenChange?: (open: boolean) => void; // TODO: Skal den bare kalles når konsument må oppdatere local state?
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

const ExpansionCardRoot = forwardRef<HTMLDetailsElement, ExpansionCardProps>(
  (
    {
      className,
      onOpenChange,
      open,
      defaultOpen = false,
      size = "medium",
      "data-color": color = "neutral",
      onToggle, // TODO: Consider omitting this prop so that consumers don't use it by mistake when migrating
      ...rest
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDetailsElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, ref);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <ExpansionCardProvider size={size}>
        <details
          ref={mergedRef}
          className={cl(
            "aksel-expansioncard",
            className,
            `aksel-expansioncard--${size}`,
          )}
          data-color={color}
          data-loaded={isMounted}
          open={open ?? defaultOpen}
          onToggle={composeEventHandlers(onToggle, (event) => {
            const detailsElm = ref.current;

            // Avoid running if event comes from a nested element (e.g. nested <details>).
            if (!detailsElm || event.target !== detailsElm) {
              return;
            }

            // Only call onOpenChange if the consumer actually needs to update their state.
            // FYI: When controlled, onToggle will fire twice: once when the trigger is clicked,
            // and once when the open prop is updated (even though the state hasn't actually changed).
            if (onOpenChange && detailsElm.open !== open) {
              onOpenChange(detailsElm.open);
            }

            // Make sure state is in sync when controlled
            if (open !== undefined && detailsElm.open !== open) {
              detailsElm.open = open; // TODO: Vurder om trenger controlled state. Konsument kan åpne med ref.open = true
            }
          })}
          {...rest}
        />
      </ExpansionCardProvider>
    );
  },
);

/**
 * A component that displays an expandable card.
 *
 * PREVIEW: This version of ExpansionCard uses the `details` and `summary` HTML elements.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/expansioncard)
 * @see 🏷️ {@link ExpansionCardProps}
 *
 * @example
 * ```jsx
 * <ExpansionCard>
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
  /*
   * @see 🏷️ {@link ExpansionCardContentProps}
   */
  Content: ExpansionCardContent,
});

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace ExpansionCard {
  export type Props = ExpansionCardProps;
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Header {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = ExpansionCardHeader.Props;
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Title {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = ExpansionCardTitle.Props;
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Description {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = ExpansionCardDescription.Props;
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Content {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = ExpansionCardContent.Props;
  }
}

// eslint-disable-next-line import/export
export { ExpansionCard };
