"use client";

import cl from "clsx";
import Head from "next/head";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  ComponentType,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";
import { BodyShort, Box, HStack } from "@navikt/ds-react";
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
  minHeight?: string;
  showBreakpoints?: boolean;
};

export const withDsExample = (
  Component: ComponentType,
  { variant, background, minHeight, showBreakpoints }: withDsT = {},
) => {
  const DsHOC = (props: any) => {
    const pathname = usePathname() || "///";
    const pathParts = pathname.split("/");

    return (
      <ThemeWrapper
        className={cl(styles.container, {
          [styles.containerDefault]: !variant,
          [styles.containerStatic]: variant === "static",
          [styles.containerFull]: variant === "full",
          [styles.containerStaticFull]: variant === "static-full",
          [styles.containerFullscreen]: variant === "fullscreen",
        })}
        style={{ background: getBg(background), minHeight }}
      >
        <Head>
          <title>
            {`${pathParts[2]}: ${pathParts[3]} - ${
              pathParts[1] === "templates" ? "Mønster/maler" : "Kodeeksempel"
            } - aksel.nav.no`}
          </title>
        </Head>
        <ExampleThemingSwitch />
        {showBreakpoints && <BreakpointText />}
        <main
          id="ds-example"
          className={variant === "static" ? styles.exampleStatic : undefined}
        >
          <Component {...props} />
        </main>
      </ThemeWrapper>
    );
  };

  if (Component.displayName) {
    DsHOC.displayName = `DsExample${Component.displayName}`;
  }

  return DsHOC;
};

function ThemeWrapper({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style: CSSProperties;
  className: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

function getBg(background: withDsT["background"]): string {
  switch (background) {
    case "inverted":
      return "var(--ax-neutral-1000)";
    case "subtle":
      return "var(--ax-bg-neutral-soft)";

    default:
      return "var(--ax-bg-default)";
  }
}

const BreakpointText = () => {
  const width = useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth,
    () => 0,
  );

  let Icon = MonitorIcon;
  let breakpoint = "xl";
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
        style={{ background: "var(--ax-bg-default)" }}
      >
        <Icon aria-hidden fontSize="1.5rem" /> {breakpoint}
        <Box marginInline="space-8 space-0" asChild>
          <BodyShort textColor="subtle">{width}px</BodyShort>
        </Box>
      </HStack>
    </Box>
  );
};

const subscribeToResize = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
  };
};
