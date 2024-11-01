import cl from "clsx";
import React, { forwardRef } from "react";
import { createContext } from "../../util/create-context";

type AkselThemeContext = {
  appearance: "light" | "dark";
};

const [ThemeProvider, useAkselTheme] = createContext<AkselThemeContext>({
  errorMessage: "useAkselThemeProvider must be within AkselThemeProvider",
  hookName: "useAkselThemeProvider",
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
      appearance = context?.appearance ?? "light",
      hasBackground: hasBackgroundProp = true,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot || props.appearance !== undefined);

    return (
      <ThemeProvider appearance={appearance}>
        <div
          ref={ref}
          className={cl("navds-theme", className, {
            light: appearance === "light",
            dark: appearance === "dark",
          })}
          data-background={hasBackground}
        >
          {children}
        </div>
      </ThemeProvider>
    );
  },
);

export { AkselTheme, useAkselTheme };
