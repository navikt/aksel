import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { OverridableComponent, omit } from "../../util";
import { PageBlock } from "./parts/PageBlock";

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div" | "body";
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
  /**
   * @deprecated Deprecated in v8 and no longer has any effect. Use `<Box asChild background="...">` wrapped around `<Page>`.
   */
  background?: string;
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
        footer,
        children,
        footerPosition,
        contentBlockPadding = "end",
        ...rest
      },
      ref,
    ) => {
      const { cn } = useRenameCSS();

      const belowFold = footerPosition === "belowFold";

      return (
        <Component
          {...omit(rest, ["background"])}
          className={cn("navds-page", className)}
          ref={ref}
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
