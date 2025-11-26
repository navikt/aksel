import React, { forwardRef } from "react";
import type {
  AkselColoredBorderToken,
  AkselColoredStatelessBackgroundToken,
  AkselRootBackgroundToken,
  AkselRootBorderToken,
  AkselShadowToken,
} from "@navikt/ds-tokens/types";
import { Slot } from "../../slot/Slot";
import { useRenameCSS } from "../../theme/Theme";
import { omit } from "../../util";
import { OverridableComponent } from "../../util/types";
import BasePrimitive, {
  PRIMITIVE_PROPS,
  PrimitiveProps,
} from "../base/BasePrimitive";
import { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { getResponsiveProps } from "../utilities/css";
import {
  BorderRadiusScale,
  ResponsiveProp,
  SpaceDelimitedAttribute,
} from "../utilities/types";
import BoxNew from "./Box.darkside";

/**
 * TODO: Support "base"-colors: default, soft, moderate, strong etc without color-role defined
 */
export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * CSS `background-color` property.
   * Accepts a [background/surface color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#afff774dad80).
   * @see {@link StaticDefaultBgKeys} and {@link StaticBgKeys}
   */
  background?: AkselRootBackgroundToken | AkselColoredStatelessBackgroundToken;
  /**
   * CSS `border-color` property.
   * Accepts a [border color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#adb1767e2f87).
   * @see {@link BorderColorKeys} and {@link BorderColorWithRoleKeys}
   */
  borderColor?:
    | Exclude<AkselRootBorderToken, "focus">
    | AkselColoredBorderToken;
  /**
   * CSS `border-radius` property.
   * Accepts a [radius token](https://aksel.nav.no/grunnleggende/styling/design-tokens#6d79c5605d31)
   * or an object of radius tokens for different breakpoints.
   * @example
   * borderRadius='full'
   * borderRadius='0 full 12 2'
   * borderRadius={{xs: '2 12', sm: '0', md: '12', lg: 'full'}}
   * @see {@link BorderRadiusKeys}
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
   * @see {@link ShadowKeys}
   */
  shadow?: AkselShadowToken;
} & PrimitiveProps &
  PrimitiveAsChildProps;

interface BoxComponentType
  extends OverridableComponent<BoxProps, HTMLDivElement> {
  /**
   * @deprecated Deprecated in v8. Use `Box` from '@navikt/ds-react/Box' instead (with same props).
   *
   * **Run `npx @navikt/aksel@latest codemod v8-box-new`> to migrate.**
   */
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
      const { cn } = useRenameCSS();
      const style: React.CSSProperties = {
        ..._style,
        "--__axc-box-background": background
          ? `var(--ax-bg-${background})`
          : undefined,
        "--__axc-box-shadow": shadow ? `var(--ax-shadow-${shadow})` : undefined,
        "--__axc-box-border-color": borderColor
          ? `var(--ax-border-${borderColor})`
          : undefined,
        "--__axc-box-border-width": borderWidth
          ? borderWidth
              .split(" ")
              .map((x) => `${x}px`)
              .join(" ")
          : undefined,
        ...getResponsiveProps("box", "radius", "radius", borderRadius, false, [
          "0",
        ]),
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
              "navds-box-radius": borderRadius,
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
