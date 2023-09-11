import { BorderRadiusSpecifier } from "../box/types";

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

export type PaddingType = ResponsiveProp<SpacingScale>;
export type PaddingLogicalType = ResponsiveProp<
  SpacingScale | `${SpacingScale} ${SpacingScale}`
>;

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

export function getResponsiveComplexProps<T = string>(
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
