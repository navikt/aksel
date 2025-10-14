import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { OverridableComponent } from "../../../util/types";

export const widths = ["text", "md", "lg", "xl", "2xl"] as const;

export interface PageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Predefined max-width
   *
   * text: 576px + dynamic gutters
   *
   * md:   768px
   *
   * lg:   1024px
   *
   * xl:   1280px
   *
   * 2xl:  1440px
   *
   * @default max-width: 100%;
   */
  width?: (typeof widths)[number];
  /**
   * Adds a standardised responsive padding-inline
   *
   * 3rem on > md
   *
   * 1rem on < md
   *
   * @default false
   */
  gutters?: boolean;
}

/**
 * Acts as a top-level container for defining max-width, gutters and horizontal centering
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/page)
 * @see 🏷️ {@link PageBlockProps}
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
 * With background bleed
 * Wrapping `Page.Block` with `Box` allows the background-color to use full screen-width
 * ```jsx
 * <Page
 *   footer={<Box background="..."><Page.Block width="xl" gutters /></Box>}
 *   footerPosition="belowFold"
 * >
 *   <Box background="..."><Page.Block width="xl" gutters /></Box>//Header
 *   <Box background="..."><Page.Block width="xl" gutters /></Box>//Content
 * </Page>
 * ```
 */
export const PageBlock: OverridableComponent<PageBlockProps, HTMLDivElement> =
  forwardRef(
    ({ as: Component = "div", gutters, className, width, ...rest }, ref) => {
      const { cn } = useRenameCSS();

      return (
        <Component
          {...rest}
          className={cn(
            "navds-pageblock",
            width && `navds-pageblock--${width}`,
            className,
            { "navds-pageblock--gutters": gutters },
          )}
          ref={ref}
        />
      );
    },
  );

export default PageBlock;
