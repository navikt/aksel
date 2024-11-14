import cl from "clsx";
import React, { forwardRef } from "react";
import { createContext } from "../../util/create-context";

type AkselThemeContext = {
  /**
   * Available color-themes
   * @default "light"
   */
  theme?: "light" | "dark";
  /**
   * Brand volume
   * @default "low"
   * This is experimental and subject name changes
   */
  volume?: "high" | "low";
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
      volume = context?.volume ?? "low",
      hasBackground: hasBackgroundProp = true,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot || props.theme !== undefined);

    return (
      <ThemeProvider theme={theme} volume={volume}>
        <div
          ref={ref}
          className={cl("navds-theme", className, theme)}
          data-background={hasBackground}
          data-volume={volume}
        >
          {children}
        </div>
      </ThemeProvider>
    );
  },
);

export { AkselTheme, useAkselTheme };
