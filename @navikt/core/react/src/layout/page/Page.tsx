import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util";
import { PageBlock } from "./parts/PageBlock";

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div" | "body";
  /**
   * Background color. Accepts a color token.
   * @default bg-default
   */
  background?: keyof typeof bgColors.a;
  /**
   * Allows better positioning of footer
   */
  footer?: React.ReactNode;
  /**
   * Places footer below page-fold
   */
  footerPosition?: "belowFold";
  /**
   * Adds a standardised padding of 4rem between content and footer
   */
  contentPadding?: boolean;
}

interface PageComponentType
  extends OverridableComponent<PageProps, HTMLElement> {
  Block: typeof PageBlock;
}

export const PageComponent: OverridableComponent<PageProps, HTMLElement> =
  forwardRef(
    (
      {
        as: Component = "div",
        className,
        style: _style,
        footer,
        children,
        footerPosition,
        background = "bg-default",
        contentPadding,
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
          className={cl("navds-page", className)}
          ref={ref}
          style={style}
        >
          <div
            className={cl({
              "navds-page--fullheight": belowFold,
              "navds-page--grow": !belowFold,
              "navds-page--padding": contentPadding,
            })}
          >
            {children}
          </div>
          {footer}
        </Component>
      );
    }
  );

const Page = PageComponent as PageComponentType;

Page.Block = PageBlock;

export default Page;
