import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import { HStack } from "@navikt/ds-react";
import cl from "clsx";
import { ComponentType, useEffect, useState } from "react";
import styles from "./examples.module.css";

export const withDsExample = (
  Component: ComponentType,
  /**
   * Static: Used for dynamic-height examples like ExpansionCard
   */
  {
    variant,
    showBreakpoints,
  }: {
    variant?: "full" | "inverted" | "static" | "subtle";
    showBreakpoints?: boolean;
  } = {}
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
        <HStack gap="1" className="absolute left-2 top-1" align="center">
          <Icon aria-hidden fontSize="1.5rem" /> {`${breakpoint}`}
        </HStack>
      );
    };

    return (
      <div
        className={cl(styles.examples, {
          "bg-gray-900": variant === "inverted",
          "bg-bg-subtle": variant === "subtle",
          [styles.containerStatic]: variant === "static",
          [styles.container]: variant !== "static",
        })}
      >
        <style global>{`html {scrollbar-gutter: unset;}`}</style>
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
