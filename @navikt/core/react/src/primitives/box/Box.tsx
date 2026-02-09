import React, { forwardRef } from "react";
import type {
  AkselColoredBorderToken,
  AkselColoredStatelessBackgroundToken,
  AkselDynamicStatelessBackgroundToken,
  AkselRootBackgroundToken,
  AkselRootBorderToken,
  AkselShadowToken,
} from "@navikt/ds-tokens/types";
import { type OverridableComponent, omit } from "../../utils-external";
import { Slot } from "../../utils/components/slot/Slot";
import { cl } from "../../utils/helpers";
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

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * CSS `background-color` property.
   * Accepts a [background color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#backgroundColor).
   * @see {@link AkselRootBackgroundToken}, {@link AkselColoredStatelessBackgroundToken} and {@link AkselDynamicStatelessBackgroundToken}
   */
  background?:
    | AkselRootBackgroundToken
    | AkselColoredStatelessBackgroundToken
    | AkselDynamicStatelessBackgroundToken;
  /**
   * CSS `border-color` property.
   * Accepts a [border color token](https://aksel.nav.no/grunnleggende/styling/design-tokens#borderColor).
   * @see {@link AkselColoredBorderToken}
   */
  borderColor?:
    | Exclude<AkselRootBorderToken, "focus">
    | AkselColoredBorderToken;
  /**
   * CSS `border-radius` property.
   * Accepts a [radius token](https://aksel.nav.no/grunnleggende/styling/design-tokens#radius)
   * or an object of radius tokens for different breakpoints.
   * @example
   * borderRadius='full'
   * borderRadius='0 full 12 2'
   * borderRadius={{xs: '2 12', sm: '0', md: '12', lg: 'full'}}
   * @see {@link BorderRadiusScale}
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

interface BoxComponentType extends OverridableComponent<
  BoxProps,
  HTMLDivElement
> {
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
 * <Box padding="space-16">
 *   <BodyShort>Hei</BodyShort>
 * </Box>
 *
 * @example
 * <Box padding={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}>
 *   <BodyShort>Hei</BodyShort>
 * </Box>
 *
 * @example
 * <VStack gap="space-32">
 *  <Box padding="space-16">
 *   <BodyShort>Hei</BodyShort>
 *  </Box>
 *  <Box padding="space-16">
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
      }: BoxProps & { as?: React.ElementType },
      ref,
    ) => {
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
            className={cl("aksel-box", className, {
              "aksel-box-bg": background,
              "aksel-box-border-color": borderColor,
              "aksel-box-border-width": borderWidth,
              "aksel-box-radius": borderRadius,
              "aksel-box-shadow": shadow,
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
