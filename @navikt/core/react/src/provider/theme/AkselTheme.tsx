import cl from "clsx";
import React, { forwardRef } from "react";
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
} & AkselThemeContext;

const AkselTheme = forwardRef<HTMLDivElement, AkselThemeProps>(
  (props: AkselThemeProps, ref) => {
    const context = useAkselTheme(false);

    const {
      children,
      className,
      theme = context?.theme ?? "light",
      hasBackground: hasBackgroundProp = true,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot || props.theme !== undefined);

    return (
      <ThemeProvider theme={theme}>
        <div
          ref={ref}
          className={cl("navds-theme", className, theme)}
          data-background={hasBackground}
        >
          {children}
        </div>
      </ThemeProvider>
    );
  },
);

export { AkselTheme, useAkselTheme };
