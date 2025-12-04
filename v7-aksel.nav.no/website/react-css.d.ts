import "react";

/**
 * Extend the CSSProperties interface to allow custom key-value pair.
 * This opens up for more dynamic styling in components while avoiding ts-errors.
 * @example
 * ```
 * const inlineStyles: CSSProperties = {
    "--custom-token-1": dynamicPxValue + "px",
  };
 * ```
 */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
