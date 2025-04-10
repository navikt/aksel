import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
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
   * @deprecated Use `<Box asChild background="...">` wrapped around `<Page>`.
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
        background,
        contentBlockPadding = "end",
        ...rest
      },
      ref,
    ) => {
      const themeContext = useThemeInternal(false);
      const { cn } = useRenameCSS();

      if (process.env.NODE_ENV !== "production" && themeContext && background) {
        console.warn(
          `Prop \`background\` is deprecated and cannot be used with theme-support. Instead wrap component with \`<Box asChild background>\``,
        );
      }

      const style: React.CSSProperties = {
        ..._style,
        "--__ac-page-background": `var(--a-${background ?? "bg-default"})`,
      };

      const belowFold = footerPosition === "belowFold";

      return (
        <Component
          {...rest}
          className={cn("navds-page", className)}
          ref={ref}
          style={style}
        >
          <div
            className={cn({
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
