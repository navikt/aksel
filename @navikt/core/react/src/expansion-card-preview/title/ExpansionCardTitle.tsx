import React, { forwardRef } from "react";
import type { OverridableComponent } from "../../utils-external";
import { cl } from "../../utils/helpers";

interface ExpansionCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes text-sizing
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
}

/**
 * @see 🏷️ {@link ExpansionCardTitleProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 */
const ExpansionCardTitle: OverridableComponent<
  ExpansionCardTitleProps,
  HTMLHeadingElement
> = forwardRef(
  ({ className, as: Component = "h3", size = "medium", ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "aksel-expansioncard__title",
          `aksel-expansioncard__title--${size}`,
          "aksel-heading",
          `aksel-heading--${size}`,
          className,
        )}
      />
    );
  },
);

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace ExpansionCardTitle {
  export type Props = ExpansionCardTitleProps;
}

// eslint-disable-next-line import/export
export { ExpansionCardTitle };
