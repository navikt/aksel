import cl from "clsx";
import React, { forwardRef } from "react";
import { Slot } from "../slot/Slot";
import { createContext } from "../util/create-context";
import { AsChildProps } from "../util/types";

/* -------------------------------------------------------------------------- */
/*                               CSS Trsnalation                              */
/* -------------------------------------------------------------------------- */
type RenameCSSContext = {
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
  /* Replace function with this when implementation is complete and CSS is updated */
  /* <RenameCSSProvider cn={compositeClassFunction}> */
  return <RenameCSSProvider cn={cl}>{children}</RenameCSSProvider>;
};

/* -------------------------------------------------------------------------- */
/*                               Theme provider                               */
/* -------------------------------------------------------------------------- */
type ThemeContext = {
  /**
   * Color theme
   * @default "light"
   */
  theme?: "light" | "dark";
};

const [ThemeProvider, useThemeInternal] = createContext<ThemeContext>({
  hookName: "useTheme",
  name: "ThemeProvider",
  providerName: "ThemeProvider",
});

export type ThemeProps = {
  className?: string;
  hasBackground?: boolean;
} & ThemeContext &
  AsChildProps;

const Theme = forwardRef<HTMLDivElement, ThemeProps>(
  (props: ThemeProps, ref) => {
    const context = useThemeInternal(false);

    const {
      children,
      className,
      asChild = false,
      theme = context?.theme ?? "light",
      hasBackground: hasBackgroundProp = true,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot && props.theme !== undefined);

    const SlotElement = asChild ? Slot : "div";

    return (
      <ThemeProvider theme={theme}>
        <RenameCSS>
          <SlotElement
            ref={ref}
            className={cl("navds-theme", className, theme)}
            data-background={hasBackground}
          >
            {children}
          </SlotElement>
        </RenameCSS>
      </ThemeProvider>
    );
  },
);

export { Theme, useRenameCSS, useThemeInternal };
