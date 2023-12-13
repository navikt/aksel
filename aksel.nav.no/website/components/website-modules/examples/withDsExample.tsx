import cl from "clsx";
import { ComponentType, useEffect, useState } from "react";
import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import { HStack } from "@navikt/ds-react";
import styles from "./examples.module.css";

type withDsT = {
  variant?: "full" | "inverted" | "static" | "subtle";
  showBreakpoints?: boolean;
};

export const withDsExample = (
  Component: ComponentType,
  /**
   * Static: Used for dynamic-height examples like ExpansionCard
   */
  { variant, showBreakpoints }: withDsT = {}
) => {
  const DsHOC = (props: any) => {
    const [width, setWidth] = useState<number>();

    useEffect(() => {
      const updateWidth = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", updateWidth);
      updateWidth();

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }, []);

    const BreakpointText = () => {
      let breakpoint = "";
      let Icon = LaptopIcon;
      if (width < 480) {
        Icon = MobileSmallIcon;
        breakpoint = "xs";
      } else if (width < 768) {
        Icon = MobileIcon;
        breakpoint = "sm";
      } else if (width < 1024) {
        Icon = TabletIcon;
        breakpoint = "md";
      } else if (width < 1280) {
        Icon = LaptopIcon;
        breakpoint = "lg";
      } else {
        Icon = MonitorIcon;
        breakpoint = "xl";
      }
      return (
        <HStack
          gap="05"
          className="rounded-br-medium absolute left-0 top-0 p-1"
          align="center"
          style={{ background: getBg(variant) }}
        >
          <Icon aria-hidden fontSize="1.5rem" /> {`${breakpoint}`}
        </HStack>
      );
    };

    return (
      <div
        className={cl(styles.examples, {
          [styles.containerStatic]: variant === "static",
          [styles.container]: variant !== "static",
        })}
        style={{ background: getBg(variant) }}
      >
        {showBreakpoints && <BreakpointText />}
        <div
          id="ds-example"
          className={cl({
            "w-full": variant === "full",
          })}
        >
          <Component {...props} />
        </div>
      </div>
    );
  };

  if (Component.displayName) {
    DsHOC.displayName = `DsExample${Component.displayName}`;
  }

  return DsHOC;
};

function getBg(variant: withDsT["variant"]): string {
  switch (variant) {
    case "inverted":
      return "var(--a-surface-inverted)";
    case "subtle":
      return "var(--a-bg-subtle)";

    default:
      return "var(--a-bg-default)";
  }
}
