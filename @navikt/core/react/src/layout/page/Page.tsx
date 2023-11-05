import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import cl from "clsx";
import React, { forwardRef } from "react";
import { PageBlock } from "./parts/PageBlock";

/**
 * TODO: Legge til støtte for HTMLBodyElement i `as`
 */
export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div";
  /** Background color. Accepts a color token.
   * @default bg-default
   */
  background?: keyof typeof bgColors.a;
  /**
   * Allows automatic positioning of footer
   */
  footer?: React.ReactNode;
  /**
   * Makes sure to place footer below fold
   */
  footerPosition?: "belowFold";
}

interface PageComponent
  extends React.ForwardRefExoticComponent<
    PageProps & React.RefAttributes<HTMLDivElement>
  > {
  Block: typeof PageBlock;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  (
    {
      as: Component = "div",
      className,
      style: _style,
      footer,
      children,
      footerPosition,
      background = "bg-default",
      ...rest
    },
    ref
  ) => {
    const style: React.CSSProperties = {
      ..._style,
      "--__ac-page-background": `var(--a-${background})`,
    };

    const belowFold = footerPosition === "belowFold";

    return (
      <Component
        {...rest}
        className={cl("navds-page", "navds-page--fullheight", className)}
        ref={ref}
        style={style}
      >
        <div
          className={cl({
            "navds-page--fullheight": belowFold,
            "navds-page--grow": !belowFold,
          })}
        >
          {children}
        </div>
        {footer}
      </Component>
    );
  }
) as PageComponent;

Page.Block = PageBlock;

export default Page;
