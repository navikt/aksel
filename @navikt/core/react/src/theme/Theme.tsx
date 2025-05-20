import cl from "clsx";
import React, { forwardRef } from "react";
import { GlobalColorRoles } from "@navikt/ds-tokens/types";
import { Slot } from "../slot/Slot";
import { createContext } from "../util/create-context";
import { AsChildProps } from "../util/types";

/* -------------------------------------------------------------------------- */
/*                               CSS Translation                              */
/* -------------------------------------------------------------------------- */
type RenameCSSContext = {
  /**
   * Extends `clsx` with custom className handler
   */
  cn: (...inputs: Parameters<typeof cl>) => ReturnType<typeof cl>;
};

const [RenameCSSProvider, useRenameCSS] = createContext<RenameCSSContext>({
  hookName: "useRenameCSS",
  name: "RenameCSS",
  providerName: "RenameCSSProvider",
  defaultValue: { cn: cl },
});

export const compositeClassFunction = (
  ...inputs: Parameters<typeof cl>
): string => {
  const classes = cl(inputs)
    /* Replaces only if start of string  "navds- navds-"*/
    .replace(/^navds-/g, "aksel-")
    /* Replaces all " navds-" hits */
    .replace(/\snavds-/g, " aksel-");

  return classes.trim();
};

const RenameCSS = ({ children }: { children: React.ReactNode }) => {
  return (
    <RenameCSSProvider cn={compositeClassFunction}>
      {children}
    </RenameCSSProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Theme provider                               */
/* -------------------------------------------------------------------------- */
type ThemeContext = {
  /**
   * Color theme
   * @default Inherits parent theme, or "light" if root
   */
  theme?: "light" | "dark";
  colorRole?: GlobalColorRoles;
};

const [ThemeProvider, useThemeInternal] = createContext<ThemeContext>({
  hookName: "useTheme",
  name: "ThemeProvider",
  providerName: "ThemeProvider",
});

export type ThemeProps = {
  className?: string;
  /**
   * Sets default background when enabled
   */
  hasBackground?: boolean;
  /**
   * Sets default 'base'-color for application
   */
  "data-color-role"?: GlobalColorRoles;
} & Omit<ThemeContext, "colorRole"> &
  AsChildProps;

const Theme = forwardRef<HTMLDivElement, ThemeProps>(
  (props: ThemeProps, ref) => {
    const context = useThemeInternal(false);

    const {
      children,
      className,
      asChild = false,
      theme = context?.theme,
      hasBackground: hasBackgroundProp = true,
      "data-color-role": colorRole = context?.colorRole,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot && props.theme !== undefined);

    const SlotElement = asChild ? Slot : "div";

    return (
      <ThemeProvider theme={theme} colorRole={colorRole}>
        <RenameCSS>
          <SlotElement
            ref={ref}
            className={cl("aksel-theme", className, theme)}
            data-background={hasBackground}
            data-color-role={colorRole}
          >
            {children}
          </SlotElement>
        </RenameCSS>
      </ThemeProvider>
    );
  },
);

export { Theme, useRenameCSS, useThemeInternal };
