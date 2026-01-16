import React, { forwardRef } from "react";
import { Slot } from "../slot/Slot";
import { AkselColor } from "../types";
import { cl } from "../util/className";
import { createStrictContext } from "../util/create-strict-context";
import { AsChildProps } from "../util/types";

const DEFAULT_COLOR: AkselColor = "accent";

type ThemeContext = {
  /**
   * Color theme.
   * @default Inherits parent theme, or "light" if root.
   */
  theme?: "light" | "dark";
  color?: AkselColor;
  /**
   * Indicates if Theme-component is on root-level or not.
   */
  isRoot: boolean;
};

const { Provider: ThemeProvider, useContext: useThemeInternal } =
  createStrictContext<ThemeContext>({
    name: "ThemeProvider",
    defaultValue: {
      color: DEFAULT_COLOR,
      isRoot: true,
    },
  });

export type ThemeProps = {
  className?: string;
  /**
   * Whether to apply the default background.
   * @default `true` if this is the root instance and `theme` is defined, otherwise `false`.
   */
  hasBackground?: boolean;
  /**
   * Changes default 'base'-color for application.
   */
  "data-color"?: AkselColor;
} & Omit<ThemeContext, "color" | "isRoot"> &
  AsChildProps;

const Theme = forwardRef<HTMLDivElement, ThemeProps>(
  (props: ThemeProps, ref) => {
    const context = useThemeInternal();

    const {
      children,
      className,
      asChild = false,
      theme = context?.theme,
      hasBackground: hasBackgroundProp,
      "data-color": color = context?.color,
    } = props;

    const isRoot = context?.isRoot;

    const hasBackground =
      hasBackgroundProp ?? (isRoot && props.theme !== undefined);

    const SlotElement = asChild ? Slot : "div";

    return (
      <ThemeProvider theme={theme} color={color} isRoot={false}>
        <SlotElement
          ref={ref}
          className={cl("aksel-theme", className, theme)}
          data-background={hasBackground}
          data-color={color ?? DEFAULT_COLOR}
        >
          {children}
        </SlotElement>
      </ThemeProvider>
    );
  },
);

export { Theme, useThemeInternal };
