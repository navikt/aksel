import cl from "clsx";
import { ComponentType, useEffect, useState } from "react";
import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import { Box, HStack } from "@navikt/ds-react";
import styles from "./examples.module.css";

type withDsT = {
  /**
   * Full: No horizontal centering (i.e. full width with padding).
   * Static: No vertical centering and static (but responsive) width. Used for dynamic-height examples like ExpansionCard.
   * Static-full: No centering in any direction.
   * Fullscreen: No centering and no padding.
   */
  variant?: "full" | "static" | "static-full" | "fullscreen";
  background?: "inverted" | "subtle";
  showBreakpoints?: boolean;
};

export const withDsExample = (
  Component: ComponentType,
  { variant, background, showBreakpoints }: withDsT = {},
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
      if (!width) {
        Icon = MonitorIcon;
        breakpoint = "xl";
      } else if (width < 480) {
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
          className="absolute left-0 top-0 rounded-br-medium p-1"
          align="center"
          style={{ background: getBg(background) }}
        >
          <Icon aria-hidden fontSize="1.5rem" /> {`${breakpoint}`}
          <Box marginInline="2 0" className="text-text-subtle">
            {width}px
          </Box>
        </HStack>
      );
    };

    return (
      <div
        className={cl(styles.container, {
          [styles.containerDefault]: !variant,
          [styles.containerStatic]: variant === "static",
          [styles.containerFull]: variant === "full",
          [styles.containerStaticFull]: variant === "static-full",
          [styles.containerFullscreen]: variant === "fullscreen",
        })}
        style={{ background: getBg(background) }}
      >
        {showBreakpoints && <BreakpointText />}
        <div
          id="ds-example"
          className={variant === "static" ? styles.exampleStatic : undefined}
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

function getBg(background: withDsT["background"]): string {
  switch (background) {
    case "inverted":
      return "var(--a-surface-inverted)";
    case "subtle":
      return "var(--a-bg-subtle)";

    default:
      return "var(--a-bg-default)";
  }
}
