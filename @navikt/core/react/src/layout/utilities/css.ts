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

  const styleProps = {};
  Object.entries(responsiveProp).forEach(([breakpointAlias, aliasOrScale]) => {
    styleProps[`--__ac-${componentName}-${componentProp}-${breakpointAlias}`] =
      translateTokenStringToCSS(
        componentProp,
        aliasOrScale,
        tokenSubgroup,
        tokenExceptions,
        invert
      );
  });
  return styleProps;
}
