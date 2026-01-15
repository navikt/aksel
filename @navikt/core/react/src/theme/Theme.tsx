import cl from "clsx";
import React, { forwardRef } from "react";
import { Slot } from "../slot/Slot";
import { AkselColor } from "../types";
import { createStrictContext } from "../util/create-strict-context";
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

const { Provider: RenameCSSProvider, useContext: useRenameCSS } =
  createStrictContext<RenameCSSContext>({
    name: "RenameCSS",
    defaultValue: { cn: compositeClassFunction },
  });

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
        <RenameCSS>
          <SlotElement
            ref={ref}
            className={cl("aksel-theme", className, theme)}
            data-background={hasBackground}
            data-color={color ?? DEFAULT_COLOR}
          >
            {children}
          </SlotElement>
        </RenameCSS>
      </ThemeProvider>
    );
  },
);

export { Theme, useRenameCSS, useThemeInternal };
