// eslint-disable-next-line react/no-typos
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--ac-${string}`]: string | undefined;
    [key: `--__ac-${string}`]: string | undefined;
  }
}
