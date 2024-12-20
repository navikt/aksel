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
    .map((propValue, _, arr) => {
      if (componentProp === "margin-inline" && propValue === "full") {
        const width = 100 / arr.length;
        return `calc((100vw - ${width}%)/-2)`;
      }

      if (componentProp === "padding-inline" && propValue === "full") {
        const width = 100 / arr.length;
        return `calc((100vw - ${width}%)/2)`;
      }
      if (["mi", "mb"].includes(componentProp) && propValue === "auto") {
        return "auto";
      }

      let output = `var(--${prefix}-${tokenSubgroup}-${propValue})`;

      /**
       * While migrating to the new tokens, we need to handle some exceptions
       * where new "space-x" tokens are used as propValues replacing old "spacing-x" tokens.
       */
      if (tokenSubgroup === "spacing" && propValue.startsWith("space")) {
        output = `var(--${prefix}-${propValue})`;
      }
      if (tokenExceptions.includes(propValue)) {
        output = translateExceptionToCSS(propValue);
      }
      if (invert) {
        if (propValue === "0") {
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
