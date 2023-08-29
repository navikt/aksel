import { BorderRadii } from "../box/types";

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

type ResponsivePropConfig<T = string> = {
  // eslint-disable-next-line no-unused-vars
  [Breakpoint in BreakpointsAlias]?: T;
};

type ResponsiveLogicalTuple<T = string> = {
  // eslint-disable-next-line no-unused-vars
  [Breakpoint in BreakpointsAlias]?: [T, T];
};

export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;

export type ResponsiveValue<T = string> = undefined | ResponsiveProp<T>;

type LogicalDesignator = "inline" | "block";

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

type blockT<T extends string> =
  | `${T}`
  | `${T}Inline`
  | `${T}InlineStart`
  | `${T}InlineEnd`
  | `${T}Block`
  | `${T}BlockStart`
  | `${T}BlockEnd`;

type BlockString = ResponsiveLogicalTuple<SpacingScale>;

/** desired output?
  [
    ['--__ac-box-padding-inline-xs', `var(...) var(...)`], 
    ['--__ac-box-padding-block-xs'], `var(...) var(...)`],
    ...
  ]
  */
function createStyleEntries(
  blockString: BlockString,
  componentName: string,
  componentProp: string,
  blockOrInline: LogicalDesignator
) {
  return Object.fromEntries(
    Object.entries(blockString).map(([breakpointAlias, aliasOrScale]) => [
      `--__ac-${componentName}-${componentProp}-${blockOrInline}-${breakpointAlias}`,
      `var(--a-spacing-${aliasOrScale[0]}) var(--a-spacing-${aliasOrScale[1]})`,
    ])
  );
}

function getPreviousSetBreakpoint(
  blockString: BlockString,
  breakpointAlias: BreakpointsAlias
) {
  let curr: BreakpointsAlias | null = breakpointAlias;
  while (curr) {
    if (blockString[curr]) {
      return blockString[curr];
    }
    curr = PreviousBreakpointLookup[curr];
  }
  if (curr) {
    return PreviousBreakpointLookup[curr];
  }
  return null;
}

function setBlockProp(
  blockString: BlockString,
  responsiveKey: ResponsiveProp<SpacingScale> | undefined,
  index: 0 | 1
) {
  if (!responsiveKey) return;
  if (typeof responsiveKey === "string") {
    blockString.xs = index
      ? [blockString?.xs?.[0] ?? "0", responsiveKey]
      : [responsiveKey, blockString?.xs?.[1] ?? "0"];
    return;
  }

  Object.assign(blockString, {
    ...structuredClone(blockString),
    ...Object.fromEntries(
      Object.entries(responsiveKey).map(([breakpointAlias, spacingScale]) => {
        return [
          breakpointAlias,
          index
            ? [
                blockString?.[breakpointAlias]?.[0] ??
                  (getPreviousSetBreakpoint(
                    blockString,
                    breakpointAlias as BreakpointsAlias
                  )?.[1] ||
                    "0"),
                spacingScale,
              ]
            : [
                spacingScale,
                blockString?.[breakpointAlias]?.[0] ??
                  (getPreviousSetBreakpoint(
                    blockString,
                    breakpointAlias as BreakpointsAlias
                  )?.[0] ||
                    "0"),
              ],
        ];
      })
    ),
  });
}

// eslint-disable-next-line no-unused-vars
export function getResponsivePropsPaddingForInlineOrBlock<T = string>(
  componentName: string,
  logicalCss: LogicalDesignator,
  responsiveProps: {
    // eslint-disable-next-line no-unused-vars
    [key in blockT<"padding">]?: ResponsiveProp<SpacingScale>;
  }
) {
  if (!responsiveProps) {
    return {};
  }

  let blockString: BlockString = {};

  if (responsiveProps?.["padding"]) {
    const responsiveKey = responsiveProps["padding"];
    setBlockProp(blockString, responsiveKey, 0);
    setBlockProp(blockString, responsiveKey, 1);
  }
  if (responsiveProps?.[`paddingInline`]) {
    const responsiveKey = responsiveProps[`paddingInline`];
    setBlockProp(blockString, responsiveKey, 0);
    setBlockProp(blockString, responsiveKey, 1);
  }
  if (responsiveProps?.[`paddingInlineStart`]) {
    const responsiveKey = responsiveProps[`paddingInlineStart`];
    setBlockProp(blockString, responsiveKey, 0);
  }
  if (responsiveProps?.[`paddingInlineEnd`]) {
    const responsiveKey = responsiveProps[`paddingInlineEnd`];
    setBlockProp(blockString, responsiveKey, 1);
  }
  if (responsiveProps?.[`paddingBlock`]) {
    const responsiveKey = responsiveProps[`paddingBlock`];
    setBlockProp(blockString, responsiveKey, 0);
    setBlockProp(blockString, responsiveKey, 1);
  }
  if (responsiveProps?.[`paddingBlockStart`]) {
    const responsiveKey = responsiveProps[`paddingBlockStart`];
    setBlockProp(blockString, responsiveKey, 0);
  }
  if (responsiveProps?.[`paddingBlockEnd`]) {
    const responsiveKey = responsiveProps[`paddingBlockEnd`];
    setBlockProp(blockString, responsiveKey, 1);
  }

  const entries = createStyleEntries(
    blockString,
    componentName,
    "padding",
    logicalCss
  );
  return entries;
}

export function getResponsiveValue<T = string>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveValue<T>
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

type StartsAndEnds<T extends string> =
  | `${T}`
  | `${T}StartStart`
  | `${T}StartEnd`
  | `${T}EndStart`
  | `${T}EndEnd`;

type RadiusSpecifier = {
  // eslint-disable-next-line no-unused-vars
  [key in StartsAndEnds<"borderRadius">]?: BorderRadii;
};

/**
 [
  ['--__ac-box-border-radius', `var(...)`],
 ]
 */
export const getBorderRadius = (radius: RadiusSpecifier): string => {
  console.log({ radius });
  let borderRadius = radius.borderRadius
    ? `var(--a-border-radius-${radius.borderRadius})`
    : "0";
  let startStart = borderRadius,
    startEnd = borderRadius,
    endStart = borderRadius,
    endEnd = borderRadius;

  console.log(startStart, startEnd, endStart, endEnd);
  startStart = radius.borderRadiusStartStart
    ? `var(--a-border-radius-${radius.borderRadiusStartStart})`
    : startStart;
  startEnd = radius.borderRadiusStartEnd
    ? `var(--a-border-radius-${radius.borderRadiusStartEnd})`
    : startEnd;
  endStart = radius.borderRadiusEndStart
    ? `var(--a-border-radius-${radius.borderRadiusEndStart})`
    : endStart;
  endEnd = radius.borderRadiusEndEnd
    ? `var(--a-border-radius-${radius.borderRadiusEndEnd})`
    : endEnd;

  console.log(startStart, startEnd, endStart, endEnd);
  return `${startStart} ${startEnd} ${endEnd} ${endStart}`;
};
