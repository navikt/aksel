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
  onOpenChange?: (open: boolean) => void;
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
   * Automatically open when fragment navigation or the browser's
   * "Find in page" feature causes a scroll to the content.
   * @default true
   */
  openWhenFound?: boolean; // TODO
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
      ...rest
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDetailsElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, ref);

    function summaryClicked() {
      const detailsElm = ref.current;
      if (!detailsElm) return;
      detailsElm.setAttribute("data-animate", "true");
      setTimeout(() => detailsElm.setAttribute("data-animate", "false"), 0);
    }

    return (
      <ExpansionCardProvider size={size} summaryClicked={summaryClicked}>
        <details
          ref={mergedRef}
          className={cl(
            "aksel-expansioncard",
            className,
            `aksel-expansioncard--${size}`,
          )}
          data-color={color}
          data-animate="false"
          open={open ?? defaultOpen}
          onToggle={(event) => {
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
              detailsElm.open = open;
            }
          }}
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
   * @see 🏷️ {@link ExpansionCardHeader.Props}
   */
  Header: ExpansionCardHeader,
  /**
   * @see 🏷️ {@link ExpansionCardTitle.Props}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: ExpansionCardTitle,
  /**
   * @see 🏷️ {@link ExpansionCardDescription.Props}
   */
  Description: ExpansionCardDescription,
  /**
   * @see 🏷️ {@link ExpansionCardContent.Props}
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
