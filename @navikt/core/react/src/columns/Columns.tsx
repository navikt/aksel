import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

type SpacingT =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "32";

export interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Number of columns to display. Can be a number, a string with a unit or tokens for spesific breakpoints.
   * Sets `grid-template-columns`.
   * @example
   * columns={{ sm: 1, md: 1, lg: "1fr auto", xl: "1fr auto"}}
   * columns={3}
   */
  columns?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
  /** Spacing between columns. Can be a number, a string with a unit or tokens for spesific breakpoints.
   * @example
   * gap="6"
   * gap={{ sm: "2", md: "2", lg: "6", xl: "6"}}
   */
  gap?:
    | SpacingT
    | {
        xs?: SpacingT;
        sm?: SpacingT;
        md?: SpacingT;
        lg?: SpacingT;
        xl?: SpacingT;
      };
}

export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(
  ({ className, columns, gap, ...rest }, ref) => {
    const styles = {
      ...columnsProps(columns),
      ...gapProps(gap),
    } as React.CSSProperties;

    return (
      <div
        {...rest}
        ref={ref}
        className={cl("navds-columns", className)}
        style={styles}
      />
    );
  }
);

function gapProps(
  gap?:
    | SpacingT
    | {
        xs?: SpacingT;
        sm?: SpacingT;
        md?: SpacingT;
        lg?: SpacingT;
        xl?: SpacingT;
      }
) {
  if (!gap) {
    return {};
  }

  if (typeof gap === "string") {
    return {
      "--ac-columns-gap-sm": `var(--navds-spacing-${gap})`,
    };
  }

  return Object.fromEntries(
    Object.entries(gap).map(([breakpoint, token]) => [
      `--ac-columns-gap-${breakpoint}`,
      `var(--a-spacing-${token})`,
    ])
  );
}

function columnsProps(
  columns?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      }
) {
  if (!columns) {
    return {};
  }

  if (typeof columns === "string" || typeof columns === "number") {
    return {
      [`--ac-columns-template-xs`]: formatColumns(columns),
    };
  }

  return Object.fromEntries(
    Object.entries(columns).map(([breakpoint, value]) => [
      `--ac-columns-template-${breakpoint}`,
      formatColumns(value),
    ])
  );
}

const formatColumns = (columns: number | string) => {
  if (typeof columns === "number") {
    return `repeat(${columns}, minmax(0, 1fr))`;
  }

  return columns;
};

export default Columns;
