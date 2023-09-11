import { BorderRadiusSpecifier } from "../box/types";

export type BreakpointsAlias = "xs" | "sm" | "md" | "lg" | "xl";

const PreviousBreakpointLookup: {
  // eslint-disable-next-line no-unused-vars
  [key in BreakpointsAlias]: BreakpointsAlias | null;
} = {
  xs: null,
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export type SpacingScale =
  | "0"
  | "05"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "32";

export type BorderRadiusType =
  | BorderRadiusSpecifier
  | `${BorderRadiusSpecifier} ${BorderRadiusSpecifier}`
  | `${BorderRadiusSpecifier} ${BorderRadiusSpecifier} ${BorderRadiusSpecifier}`
  | `${BorderRadiusSpecifier} ${BorderRadiusSpecifier} ${BorderRadiusSpecifier} ${BorderRadiusSpecifier}`;

type FixedResponsiveT<T> = {
  // eslint-disable-next-line no-unused-vars
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;

type BlockOrInline = "inline" | "block";

export function getResponsiveProps<T = string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__ac-${componentName}-${componentProp}-xs`]: `var(--a-${tokenSubgroup}-${responsiveProp})`,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
      `--__ac-${componentName}-${componentProp}-${breakpointAlias}`,
      `var(--a-${tokenSubgroup}-${aliasOrScale})`,
    ])
  );
}

type Prefix<T extends string, T2 extends string> = `${T}${T2}`;

type PaddingCSSProp = Prefix<
  "padding",
  | ""
  | "Inline"
  | "InlineStart"
  | "InlineEnd"
  | "Block"
  | "BlockStart"
  | "BlockEnd"
>;

type ResponsiveSpacing = FixedResponsiveT<[SpacingScale, SpacingScale]>;

function createStyleEntries(
  responsiveSpacing: ResponsiveSpacing,
  componentName: string,
  componentProp: string,
  blockOrInline: BlockOrInline
) {
  return Object.fromEntries(
    Object.entries(responsiveSpacing).map(
      ([breakpointAlias, spacingScales]) => [
        `--__ac-${componentName}-${componentProp}-${blockOrInline}-${breakpointAlias}`,
        `var(--a-spacing-${spacingScales[0]}) var(--a-spacing-${spacingScales[1]})`,
      ]
    )
  );
}

function getPreviousSetBreakpoint(
  responsiveSpacing: ResponsiveSpacing,
  breakpointAlias: BreakpointsAlias
) {
  let curr: BreakpointsAlias | null = breakpointAlias;
  while (curr) {
    if (responsiveSpacing[curr]) {
      return responsiveSpacing[curr];
    }
    curr = PreviousBreakpointLookup[curr];
  }
  if (curr) {
    return PreviousBreakpointLookup[curr];
  }
  return null;
}

/**
 * Each call to this function overwrites responsiveSpacing (non pure)
 * with (hopefully) more specific CSS properties. Index toggles which of the values
 * in the tuple are used, and the meaning of the tuple changes based on whether it's
 * 'block' (top & bottom) or 'inline' (left & right)
 */
function setBlockProp(
  responsiveSpacing: ResponsiveSpacing,
  responsivePropValue: ResponsiveProp<SpacingScale> | undefined,
  index: 0 | 1
) {
  if (!responsivePropValue) return;
  if (typeof responsivePropValue === "string") {
    responsiveSpacing.xs = index
      ? [responsiveSpacing?.xs?.[0] ?? "0", responsivePropValue]
      : [responsivePropValue, responsiveSpacing?.xs?.[1] ?? "0"];
    return;
  }

  Object.assign(responsiveSpacing, {
    ...structuredClone(responsiveSpacing),
    ...Object.fromEntries(
      Object.entries(responsivePropValue).map(
        ([breakpointAlias, spacingScale]) => {
          return [
            breakpointAlias,
            index
              ? [
                  responsiveSpacing?.[breakpointAlias]?.[0] ??
                    (getPreviousSetBreakpoint(
                      responsiveSpacing,
                      breakpointAlias as BreakpointsAlias
                    )?.[1] ||
                      "0"),
                  spacingScale,
                ]
              : [
                  spacingScale,
                  responsiveSpacing?.[breakpointAlias]?.[0] ??
                    (getPreviousSetBreakpoint(
                      responsiveSpacing,
                      breakpointAlias as BreakpointsAlias
                    )?.[0] ||
                      "0"),
                ],
          ];
        }
      )
    ),
  });
}

export function getResponsivePropsPadding(
  componentName: string,
  blockOrInline: BlockOrInline,
  responsiveProps: {
    // eslint-disable-next-line no-unused-vars
    [key in PaddingCSSProp]?: ResponsiveProp<SpacingScale>;
  }
) {
  if (!responsiveProps) {
    return {};
  }

  let responsiveSpacing: ResponsiveSpacing = {};

  if (responsiveProps?.padding) {
    const responsivePropValue = responsiveProps.padding;
    setBlockProp(responsiveSpacing, responsivePropValue, 0);
    setBlockProp(responsiveSpacing, responsivePropValue, 1);
  }
  if (responsiveProps?.paddingInline) {
    const responsivePropValue = responsiveProps.paddingInline;
    setBlockProp(responsiveSpacing, responsivePropValue, 0);
    setBlockProp(responsiveSpacing, responsivePropValue, 1);
  }
  if (responsiveProps?.paddingInlineStart) {
    const responsivePropValue = responsiveProps.paddingInlineStart;
    setBlockProp(responsiveSpacing, responsivePropValue, 0);
  }
  if (responsiveProps?.paddingInlineEnd) {
    const responsivePropValue = responsiveProps.paddingInlineEnd;
    setBlockProp(responsiveSpacing, responsivePropValue, 1);
  }
  if (responsiveProps?.paddingBlock) {
    const responsivePropValue = responsiveProps.paddingBlock;
    setBlockProp(responsiveSpacing, responsivePropValue, 0);
    setBlockProp(responsiveSpacing, responsivePropValue, 1);
  }
  if (responsiveProps?.paddingBlockStart) {
    const responsivePropValue = responsiveProps.paddingBlockStart;
    setBlockProp(responsiveSpacing, responsivePropValue, 0);
  }
  if (responsiveProps?.paddingBlockEnd) {
    const responsivePropValue = responsiveProps.paddingBlockEnd;
    setBlockProp(responsiveSpacing, responsivePropValue, 1);
  }

  return createStyleEntries(
    responsiveSpacing,
    componentName,
    "padding",
    blockOrInline
  );
}

export function getResponsiveValue<T = string>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveProp<T>
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__ac-${componentName}-${componentProp}-xs`]: responsiveProp,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--__ac-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ])
  );
}

export function getResponsivePropsRadius<T = string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__ac-${componentName}-${componentProp}-xs`]: responsiveProp
        .split(" ")
        .map((x) => `var(--a-${tokenSubgroup}-${x})`)
        .join(" "),
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => {
      if (typeof aliasOrScale !== "string") {
        return [];
      }
      return [
        `--__ac-${componentName}-${componentProp}-${breakpointAlias}`,
        aliasOrScale
          .split(" ")
          .map((x) => `var(--a-${tokenSubgroup}-${x})`)
          .join(" "),
      ];
    })
  );
}
