import { ResponsiveProp } from "./types";

const TOKEN_PREFIX = "ax";

export function getResponsiveValue<T = string>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveProp<T>,
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__${TOKEN_PREFIX}c-${componentName}-${componentProp}-xs`]:
        responsiveProp,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [
      `--__${TOKEN_PREFIX}c-${componentName}-${componentProp}-${breakpointAlias}`,
      responsiveValue,
    ]),
  );
}

const translateTokenStringToCSS = (
  specialLayout: string,
  tokenString: string,
  tokenSubgroup: "space" | "radius",
  tokenExceptions: string[],
  invert: boolean,
) => {
  return tokenString
    .split(" ")
    .map((propValue, _, arr) => {
      // Handle special layout cases
      if (specialLayout === "margin-inline" && propValue === "full") {
        return `calc((100vw - ${100 / arr.length}%)/-2)`;
      }
      if (specialLayout === "padding-inline" && propValue === "full") {
        return `calc((100vw - ${100 / arr.length}%)/2)`;
      }
      if (["mi", "mb"].includes(specialLayout) && propValue === "auto") {
        return "auto";
      }

      // Handle exceptions and space tokens
      let output = `var(--${TOKEN_PREFIX}-${tokenSubgroup}-${propValue})`;

      if (tokenExceptions.includes(propValue)) {
        output = propValue;
      } else if (tokenSubgroup === "space") {
        output = `var(--${TOKEN_PREFIX}-${propValue})`;
      } else if (tokenSubgroup === "radius") {
        output = `var(--${TOKEN_PREFIX}-radius-${propValue})`;
      }

      // Handle inversion for negative values
      if (invert) {
        if (propValue === "0") return `0`;
        return `calc(-1 * ${output})`;
      }
      return output;
    })
    .join(" ");
};

export function getResponsiveProps<T extends string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: "space" | "radius",
  responsiveProp?: ResponsiveProp<T>,
  invert = false,
  tokenExceptions: string[] = [],
) {
  if (!responsiveProp) {
    return {};
  }

  if (typeof responsiveProp === "string") {
    return {
      [`--__${TOKEN_PREFIX}c-${componentName}-${componentProp}-xs`]:
        translateTokenStringToCSS(
          componentProp,
          responsiveProp,
          tokenSubgroup,
          tokenExceptions,
          invert,
        ),
    };
  }

  const styleProps = {};
  Object.entries(responsiveProp).forEach(([breakpointAlias, aliasOrScale]) => {
    styleProps[
      `--__${TOKEN_PREFIX}c-${componentName}-${componentProp}-${breakpointAlias}`
    ] = translateTokenStringToCSS(
      componentProp,
      aliasOrScale,
      tokenSubgroup,
      tokenExceptions,
      invert,
    );
  });
  return styleProps;
}
