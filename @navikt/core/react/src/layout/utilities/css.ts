export type BreakpointsAlias = "xs" | "sm" | "md" | "lg" | "xl";
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

export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;

export type ResponsiveValue<T = string> = undefined | ResponsiveProp<T>;

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
  | `${T}Block`
  | `${T}BlockStart`
  | `${T}BlockEnd`;

// eslint-disable-next-line no-unused-vars
export function getResponsivePropsPaddingMargin<T = string>(
  componentName: string,
  componentProp: "padding" | "margin",
  tokenSubgroup: string,
  responsiveProps: {
    // eslint-disable-next-line no-unused-vars
    [key in blockT<"margin" | "padding">]?: ResponsiveProp<SpacingScale>;
  }
) {
  if (!responsiveProps) {
    return {};
  }

  type BlockString = {
    top: ResponsivePropConfig<SpacingScale>;
    right: ResponsivePropConfig<SpacingScale>;
    bottom: ResponsivePropConfig<SpacingScale>;
    left: ResponsivePropConfig<SpacingScale>;
  };

  let blockString: BlockString = { top: {}, right: {}, bottom: {}, left: {} };

  if (responsiveProps?.[componentProp]) {
    const responsiveKey = responsiveProps[componentProp];
    setBlockProp(responsiveKey, blockString, "top");
    setBlockProp(responsiveKey, blockString, "right");
    setBlockProp(responsiveKey, blockString, "bottom");
    setBlockProp(responsiveKey, blockString, "left");
  }
  if (responsiveProps?.[`${componentProp}Inline`]) {
    const responsiveKey = responsiveProps[`${componentProp}Inline`];
    setBlockProp(responsiveKey, blockString, "left");
    setBlockProp(responsiveKey, blockString, "right");
  }
  if (responsiveProps?.[`${componentProp}InlineStart`]) {
    const responsiveKey = responsiveProps[`${componentProp}InlineStart`];
    setBlockProp(responsiveKey, blockString, "left");
  }
  if (responsiveProps?.[`${componentProp}InlineEnd`]) {
    const responsiveKey = responsiveProps[`${componentProp}InlineEnd`];
    setBlockProp(responsiveKey, blockString, "right");
  }

  //TODO CONTINUE HERE - make this work

  return Object.fromEntries(
    Object.entries(blockString).map(([key, value]) => [
      `--__ac-${componentName}-${componentProp}-${key}`,
      `var(--a-${tokenSubgroup}-${value})`,
    ])
  );

  function setBlockProp(
    responsiveKey: ResponsiveProp<SpacingScale> | undefined,
    blockDirection: BlockString,
    subtree: "top" | "bottom" | "right" | "left" // TODO type
  ) {
    if (!responsiveKey) return;
    if (typeof responsiveKey === "string") {
      blockDirection[subtree].xs = responsiveKey;
      return;
    }
    blockDirection[subtree] = {
      ...blockDirection[subtree],
      ...Object.fromEntries(
        Object.entries(responsiveKey).map(([breakpointAlias, aliasOrScale]) => [
          breakpointAlias,
          aliasOrScale,
        ])
      ),
    };
  }
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
