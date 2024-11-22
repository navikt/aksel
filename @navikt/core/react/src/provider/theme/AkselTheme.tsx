import cl from "clsx";
import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { createContext } from "../../util/create-context";

type AkselThemeContext = {
  theme: "light" | "dark";
};

const [ThemeProvider, useAkselTheme] = createContext<AkselThemeContext>({
  errorMessage: "useAkselTheme must be used within AkselThemeProvider",
  hookName: "useAkselTheme",
  name: "AkselThemeProvider",
  providerName: "AkselThemeProvider",
});

type AkselThemeProps = {
  children: React.ReactNode;
  className?: string;
  hasBackground?: boolean;
  /* TODO: Handle this correctly with types */
  asChild?: boolean;
} & AkselThemeContext;

const AkselTheme = forwardRef<HTMLDivElement, AkselThemeProps>(
  (props: AkselThemeProps, ref) => {
    const context = useAkselTheme(false);

    const {
      children,
      className,
      asChild = false,
      theme = context?.theme ?? "light",
      hasBackground: hasBackgroundProp = true,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot || props.theme !== undefined);

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

export { AkselTheme, useAkselTheme };
