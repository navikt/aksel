import cl from "clsx";
import React, { forwardRef } from "react";
import { UNSAFE_useAkselTheme } from "../../provider";
import { OverridableComponent } from "../../util";
import { BackgroundColorToken } from "../utilities/types";
import { PageBlock } from "./parts/PageBlock";

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div" | "body";
  /**
   * Background color.
   * Accepts a [background color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#753d1cf4d1d6).
   * @default "bg-default"
   * @deprecated 'background'-prop will be removed in future major-versions. Use `<Box asChild background="...">` wrapped around `<Page>`.
   */
  background?: BackgroundColorToken;
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
   * @default "end"
   */
  contentBlockPadding?: "end" | "none";
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
        contentBlockPadding = "end",
        ...rest
      },
      ref,
    ) => {
      const themeContext = UNSAFE_useAkselTheme(false);

      if (process.env.NODE_ENV !== "production" && themeContext) {
        console.warn(
          "Page can not be used with AkselTheme (darkmode-support). Migrate to '<Page2>'",
        );
      }

      const prefix = "a";

      const style: React.CSSProperties = {
        ..._style,
        [`--__${prefix}-page-background`]: `var(--a-${background})`,
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
              "navds-page__content--fullheight": belowFold,
              "navds-page__content--grow": !belowFold,
              "navds-page__content--padding": contentBlockPadding === "end",
            })}
          >
            {children}
          </div>
          {footer}
        </Component>
      );
    },
  );

/**
 * Page helps with establishing a top-level layout for your page
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/page)
 * @see 🏷️ {@link PageProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <Page
 *   footer={<Page.Block width="xl" gutters />}
 * >
 *   <Page.Block width="xl" gutters />// Header
 *   <Page.Block width="xl" gutters />// Content
 * </Page>
 * ```
 * @example
 * Footer placed below page-fold
 * ```jsx
 * <Page
 *   footer={<Page.Block width="xl" gutters />}
 *   footerPosition="belowFold"
 * >
 *   <Page.Block width="xl" gutters />// Header
 *   <Page.Block width="xl" gutters />// Content
 * </Page>
 * ```
 */
const Page = PageComponent as PageComponentType;

Page.Block = PageBlock;

export default Page;
