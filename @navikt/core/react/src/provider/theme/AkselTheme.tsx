import cl from "clsx";
import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
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
      volume = context?.volume ?? "low",
      hasBackground: hasBackgroundProp = true,
    } = props;

    const isRoot = context === undefined;

    const hasBackground =
      hasBackgroundProp ?? (isRoot || props.theme !== undefined);

    const SlotElement = asChild ? Slot : "div";

    return (
      <ThemeProvider theme={theme} volume={volume}>
        <SlotElement
          ref={ref}
          className={cl("navds-theme", className, theme)}
          data-background={hasBackground}
          data-volume={volume}
        >
          {children}
        </SlotElement>
      </ThemeProvider>
    );
  },
);

export { AkselTheme, useAkselTheme };
