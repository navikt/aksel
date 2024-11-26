import { ResponsiveProp } from "./types";

export function getResponsiveValue<T = string>(
  prefix: string,
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveProp<T>,
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__${prefix}c-${componentName}-${componentProp}-xs`]: responsiveProp,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--__${prefix}c-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ]),
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
  invert: boolean,
  prefix: string,
) => {
  return tokenString
    .split(" ")
    .map((x, _, arr) => {
      if (componentProp === "margin-inline" && x === "full") {
        const width = 100 / arr.length;
        return `calc((100vw - ${width}%)/-2)`;
      }

      if (componentProp === "padding-inline" && x === "full") {
        const width = 100 / arr.length;
        return `calc((100vw - ${width}%)/2)`;
      }
      if (["mi", "mb"].includes(componentProp) && x === "auto") {
        return "auto";
      }

      let output = `var(--${prefix}-${tokenSubgroup}-${x})`;
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
  prefix: string,
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>,
  invert = false,
  tokenExceptions: string[] = [],
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__${prefix}c-${componentName}-${componentProp}-xs`]:
        translateTokenStringToCSS(
          componentProp,
          responsiveProp,
          tokenSubgroup,
          tokenExceptions,
          invert,
          prefix,
        ),
    };
  }

  const styleProps = {};
  Object.entries(responsiveProp).forEach(([breakpointAlias, aliasOrScale]) => {
    styleProps[
      `--__${prefix}c-${componentName}-${componentProp}-${breakpointAlias}`
    ] = translateTokenStringToCSS(
      componentProp,
      aliasOrScale,
      tokenSubgroup,
      tokenExceptions,
      invert,
      prefix,
    );
  });
  return styleProps;
}
