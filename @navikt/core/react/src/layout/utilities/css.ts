import type { LegacySpacingKeys, SpaceKeys } from "@navikt/ds-tokens/types";
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

/**
 * Temporary lookup for mapping legacy spacing tokens to new space tokens.
 */
const legacySpacingTokenLookup: Record<
  `--ax-spacing-${LegacySpacingKeys}`,
  `--ax-${SpaceKeys}`
> = {
  "--ax-spacing-32": "--ax-space-128",
  "--ax-spacing-24": "--ax-space-96",
  "--ax-spacing-20": "--ax-space-80",
  "--ax-spacing-18": "--ax-space-72",
  "--ax-spacing-16": "--ax-space-64",
  "--ax-spacing-14": "--ax-space-56",
  "--ax-spacing-12": "--ax-space-48",
  "--ax-spacing-11": "--ax-space-44",
  "--ax-spacing-10": "--ax-space-40",
  "--ax-spacing-9": "--ax-space-36",
  "--ax-spacing-8": "--ax-space-32",
  "--ax-spacing-7": "--ax-space-28",
  "--ax-spacing-6": "--ax-space-24",
  "--ax-spacing-5": "--ax-space-20",
  "--ax-spacing-4": "--ax-space-16",
  "--ax-spacing-3": "--ax-space-12",
  "--ax-spacing-2": "--ax-space-8",
  "--ax-spacing-1-alt": "--ax-space-6",
  "--ax-spacing-1": "--ax-space-4",
  "--ax-spacing-05": "--ax-space-2",
  "--ax-spacing-0": "--ax-space-0",
};

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

      if (tokenExceptions.includes(propValue)) {
        output = translateExceptionToCSS(propValue);
      } else if (tokenSubgroup === "spacing" && propValue.startsWith("space")) {
        /**
         * While migrating to the new tokens, we need to handle some exceptions
         * where new "space-x" tokens are used as propValues replacing old "spacing-x" tokens.
         */
        output = `var(--${prefix}-${propValue})`;
      } else if (tokenSubgroup === "spacing") {
        const spacingTokenName = `--${prefix}-spacing-${propValue}`;

        /* If using new tokens, use of "legacy"-spacing like 2, 4, 8 etc needs to be translated to new space-tokens */
        output = `var(${
          legacySpacingTokenLookup[spacingTokenName] ?? spacingTokenName
        })`;
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
