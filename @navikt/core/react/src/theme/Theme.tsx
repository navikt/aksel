import cl from "clsx";
import React, { forwardRef } from "react";
import { Slot } from "../slot/Slot";
import { createContext } from "../util/create-context";
import { AsChildProps } from "../util/types";

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

type ThemeProps = {
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
        <SlotElement
          ref={ref}
          className={cl("navds-theme", className, theme)}
          data-background={hasBackground}
        >
          {children}
        </SlotElement>
      </ThemeProvider>
    );
  },
);

export { Theme, useThemeInternal };
