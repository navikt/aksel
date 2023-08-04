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

export type ResponsiveProp<T> =
  | T
  | {
      // eslint-disable-next-line no-unused-vars
      [Breakpoint in BreakpointsAlias]?: T;
    };

export function getResponsiveProps(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?:
    | string
    | {
        // eslint-disable-next-line no-unused-vars
        [Breakpoint in BreakpointsAlias]?: string;
      }
) {
  if (!responsiveProp) return {};

  if (typeof responsiveProp === "string") {
    return {
      [`--ac-${componentName}-${componentProp}-xs`]: `var(--a-${tokenSubgroup}-${responsiveProp})`,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
      `--ac-${componentName}-${componentProp}-${breakpointAlias}`,
      `var(--a-${tokenSubgroup}-${aliasOrScale})`,
    ])
  );
}
