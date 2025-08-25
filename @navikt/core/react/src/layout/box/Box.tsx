import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { omit } from "../../util";
import { OverridableComponent } from "../../util/types";
import BasePrimitive, {
  PRIMITIVE_PROPS,
  PrimitiveProps,
} from "../base/BasePrimitive";
import { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { getResponsiveProps } from "../utilities/css";
import {
  BackgroundColorToken,
  BorderColorToken,
  BorderRadiusScale,
  ResponsiveProp,
  ShadowToken,
  SpaceDelimitedAttribute,
  SurfaceColorToken,
} from "../utilities/types";
import BoxNew from "./Box.darkside";

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * CSS `background-color` property.
   * Accepts a [background/surface color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#afff774dad80).
   */
  background?: BackgroundColorToken | SurfaceColorToken;
  /**
   * CSS `border-color` property.
   * Accepts a [border color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#adb1767e2f87).
   */
  borderColor?: BorderColorToken;
  /**
   * CSS `border-radius` property.
   * Accepts a [radius token](https://aksel.nav.no/grunnleggende/styling/design-tokens#6d79c5605d31)
   * or an object of radius tokens for different breakpoints.
   * @example
   * borderRadius='full'
   * borderRadius='0 full 12 2'
   * borderRadius={{xs: '2 12', sm: '0', md: '12', lg: 'full'}}
   */
  borderRadius?: ResponsiveProp<
    SpaceDelimitedAttribute<BorderRadiusScale | "0">
  >;
  /**
   * CSS `border-width` property. If this is not set there will be no border.
   * @example
   * borderWidth='2'
   * borderWidth='1 2 3 4'
   */
  borderWidth?: SpaceDelimitedAttribute<"0" | "1" | "2" | "3" | "4" | "5">;
  /** Shadow on box. Accepts a shadow token.
   * @example
   * shadow='small'
   */
  shadow?: ShadowToken;
} & PrimitiveProps &
  PrimitiveAsChildProps;

interface BoxComponentType
  extends OverridableComponent<BoxProps, HTMLDivElement> {
  New: typeof BoxNew;
}

/**
 * Foundational Layout-primitive for generic encapsulation & styling.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/box)
 * @see 🏷️ {@link BoxProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * <Box padding="4">
 *   <BodyShort>Hei</BodyShort>
 * </Box>
 *
 * @example
 * <Box padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}>
 *   <BodyShort>Hei</BodyShort>
 * </Box>
 *
 * @example
 * <VStack gap="8">
 *  <Box padding="4">
 *   <BodyShort>Hei</BodyShort>
 *  </Box>
 *  <Box padding="4">
 *    <BodyShort>Hei</BodyShort>
 *  </Box>
 * </VStack>
 */
export const BoxComponent: OverridableComponent<BoxProps, HTMLDivElement> =
  forwardRef(
    (
      {
        children,
        className,
        as: Component = "div",
        background,
        borderColor,
        borderWidth,
        borderRadius,
        shadow,
        style: _style,
        asChild,
        ...rest
      },
      ref,
    ) => {
      const themeContext = useThemeInternal(false);
      const { cn } = useRenameCSS();

      if (
        process.env.NODE_ENV !== "production" &&
        themeContext &&
        (background || borderColor || shadow)
      ) {
        let errorText = ``;
        if (background) {
          errorText += `\n- background: "${background}"`;
        }
        if (borderColor) {
          errorText += `\n- borderColor: "${borderColor}"`;
        }
        if (shadow) {
          errorText += `\n- shadow: "${shadow}"`;
        }
        throw new Error(
          `<Box /> with properties 'background', 'borderColor' or 'shadow' cannot be used with Aksel <Theme /> (darkmode-support). \nTo continue using these properties, migrate to '<Box.New>' (BoxNew for RSC)\nUpdate these props:${errorText}`,
        );
      }

      const prefix = themeContext ? "ax" : "a";

      const style: React.CSSProperties = {
        ..._style,
        [`--__${prefix}c-box-background`]: background
          ? `var(--a-${background})`
          : undefined,
        [`--__${prefix}c-box-shadow`]: shadow
          ? `var(--a-shadow-${shadow})`
          : undefined,
        [`--__${prefix}c-box-border-color`]: borderColor
          ? `var(--a-${borderColor})`
          : undefined,
        [`--__${prefix}c-box-border-width`]: borderWidth
          ? borderWidth
              .split(" ")
              .map((x) => `${x}px`)
              .join(" ")
          : undefined,
        ...getResponsiveProps(
          prefix,
          "box",
          "radius",
          "radius",
          borderRadius,
          false,
          ["0"],
        ),
      };

      const Comp = asChild ? Slot : Component;

      return (
        <BasePrimitive {...rest}>
          <Comp
            {...omit(rest, PRIMITIVE_PROPS)}
            ref={ref}
            style={style}
            className={cn("navds-box", className, {
              "navds-box-bg": background,
              "navds-box-border-color": borderColor,
              "navds-box-border-width": borderWidth,
              "navds-box-border-radius": borderRadius && !themeContext,
              "navds-box-radius": borderRadius && themeContext,
              "navds-box-shadow": shadow,
            })}
          >
            {children}
          </Comp>
        </BasePrimitive>
      );
    },
  );

export const Box = BoxComponent as BoxComponentType;

Box.New = BoxNew;

export default Box;
