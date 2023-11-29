import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--ac-${string}`]: string | number | undefined;
    [key: `--__ac-${string}`]: string | number | undefined;
  }
}
