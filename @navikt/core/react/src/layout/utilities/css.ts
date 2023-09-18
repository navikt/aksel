import { BleedSpacing } from "../bleed/Bleed";

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

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;

type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;

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

const translateExceptionToCSS = (exception: string) => {
  switch (exception) {
    case "px":
      return "1px";
  }
  return exception;
};

const translateTokenStringToCSS = (
  componentProp: string,
  tokenString: string,
  tokenSubgroup: string,
  tokenExceptions: string[],
  invert: boolean
) => {
  return tokenString
    .split(" ")
    .map((x, _, arr) => {
      if (componentProp === "margin-inline" && x === "full") {
        const width = 100 / arr.length;
        return `calc((100vw - ${width}%)/-2)`;
      }
      if (componentProp === "margin-block" && x === "full") {
        const height = 100 / arr.length;
        return `calc((100vh - ${height}%)/2)`;
      }

      let output = `var(--a-${tokenSubgroup}-${x})`;
      if (tokenExceptions.includes(x)) {
        output = translateExceptionToCSS(x);
      }
      if (invert) {
        if (x === "0") {
          return `0`;
        }
        return `calc(-1 * ${output})`;
      }
      return output;
    })
    .join(" ");
};

export function getResponsiveProps<T extends string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>,
  invert = false,
  tokenExceptions: string[] = []
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__ac-${componentName}-${componentProp}-xs`]:
        translateTokenStringToCSS(
          componentProp,
          responsiveProp,
          tokenSubgroup,
          tokenExceptions,
          invert
        ),
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => {
      return [
        `--__ac-${componentName}-${componentProp}-${breakpointAlias}`,
        translateTokenStringToCSS(
          componentProp,
          aliasOrScale,
          tokenSubgroup,
          tokenExceptions,
          invert
        ),
      ];
    })
  );
}

export const mirrorMargin = (
  reflectivePadding: boolean | undefined,
  margin: ResponsiveProp<BleedSpacing> | undefined,
  marginInline:
    | ResponsiveProp<BleedSpacing | `${BleedSpacing} ${BleedSpacing}`>
    | undefined,
  marginBlock:
    | ResponsiveProp<BleedSpacing | `${BleedSpacing} ${BleedSpacing}`>
    | undefined
):
  | { paddingInline: string | undefined; paddingBlock: string | undefined }
  | undefined => {
  if (!reflectivePadding) {
    return undefined;
  }

  let currentMarginInline = "";
  let currentMarginBlock = "";

  // margin
  // the 4 string cases we need to handle:
  // N [E=N] [S=N] [W=N]
  // N E [S=N] [W=E]
  // N E S [W=E]
  // N E S W

  // marginInline, string cases
  // W [E=W]
  // W E

  // marginBlock, string cases
  // N [S=N]
  // N S

  // then do the same thing above for each breakpoint in object

  if (margin) {
    if (typeof margin === "string") {
      // string cases
      const directions = margin.split(" ");

      if (directions.length === 1) {
        currentMarginInline = margin;
        currentMarginBlock = margin;
      } else if (directions.length === 2) {
        currentMarginInline = directions[1];
        currentMarginBlock = directions[0];
      } else if (directions.length === 3) {
        currentMarginInline = directions[1];
        currentMarginBlock = [directions[0], directions[2]].join(" ");
      } else {
        currentMarginInline = [directions[1], directions[3]].join(" ");
        currentMarginBlock = [directions[0], directions[2]].join(" ");
      }
    }
  }
  if (marginInline) {
    if (typeof marginInline === "string") {
      currentMarginInline = marginInline;
    }
  }
  if (marginBlock) {
    if (typeof marginBlock === "string") {
      currentMarginBlock = marginBlock;
    }
  }

  return {
    paddingInline: !currentMarginInline
      ? undefined
      : currentMarginInline
          .split(" ")
          .map((x) => (x === "0" ? "0" : `var(--a-spacing-${x})`))
          .join(" "),
    paddingBlock: !currentMarginBlock
      ? undefined
      : currentMarginBlock
          .split(" ")
          .map((x) => (x === "0" ? "0" : `var(--a-spacing-${x})`))
          .join(" "),
  };
};
