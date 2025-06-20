import cl from "clsx";
import { useTheme } from "next-themes";
import { ComponentType, useEffect, useState } from "react";
import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import { Theme as AkselTheme, BodyShort, Box, HStack } from "@navikt/ds-react";
import styles from "./examples.module.css";
import { ExampleThemingSwitch } from "./withDsExample.theme";

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
  /**
   * Hides theme switch, makes sure to not use `AkselTheme` wrapper and forces light-mode.
   */
  legacyOnly?: boolean;
};

export const withDsExample = (
  Component: ComponentType,
  { variant, background, showBreakpoints, legacyOnly = false }: withDsT = {},
) => {
  const DsHOC = (props: any) => {
    const [width, setWidth] = useState<number>();
    const { theme } = useTheme();

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
        <Box
          asChild
          position="absolute"
          left="0"
          top="0"
          borderRadius="0 0 medium 0"
          padding="space-4"
        >
          <HStack
            gap="space-2"
            align="center"
            style={{ background: getBg(background) }}
          >
            <Icon aria-hidden fontSize="1.5rem" /> {`${breakpoint}`}
            <Box marginInline="space-8 space-0" asChild>
              <BodyShort textColor="subtle">{width}px</BodyShort>
            </Box>
          </HStack>
        </Box>
      );
    };

    let Wrapper: string | ((props: any) => JSX.Element) = "div";

    if ((theme === "light" || theme === "dark") && !legacyOnly) {
      Wrapper = (_props: any) => (
        <AkselTheme {..._props} hasBackground={false} />
      );
    }

    return (
      <Wrapper
        className={cl(styles.container, {
          /* Overrides global theme when showing legacy-examples */
          light: legacyOnly,
          [styles.containerDefault]: !variant,
          [styles.containerStatic]: variant === "static",
          [styles.containerFull]: variant === "full",
          [styles.containerStaticFull]: variant === "static-full",
          [styles.containerFullscreen]: variant === "fullscreen",
        })}
        style={{ background: getBg(background) }}
      >
        <ExampleThemingSwitch legacyOnly={legacyOnly} />
        {showBreakpoints && <BreakpointText />}
        <div
          id="ds-example"
          className={variant === "static" ? styles.exampleStatic : undefined}
        >
          <Component {...props} />
        </div>
      </Wrapper>
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
      return "var(--ax-neutral-1000)";
    case "subtle":
      return "var(--a-bg-neutral-soft)";

    default:
      return "var(--ax-bg-default)";
  }
}
