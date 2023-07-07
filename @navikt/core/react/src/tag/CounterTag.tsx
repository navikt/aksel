import cl from "clsx";
import React, { forwardRef } from "react";
import { Tag, TagProps } from "..";

export interface CounterTagProps extends Omit<TagProps, "children"> {
  /**
   * Count to display
   */
  count?: Number;
  /**
   * Max count before displaying "+"
   * @default 99
   */
  maxCount?: Number;
  /**
   * Tag-shape
   * @default "rounded"
   */
  shape?: "circle" | "rounded";
}

/**
 * Displays a small counter badge.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/tag)
 * @see 🏷️ {@link CounterTagProps}
 *
 * @example
 * ```jsx
 * <CounterTag count={14}/>
 * ```
 */
export const CounterTag = forwardRef<HTMLSpanElement, CounterTagProps>(
  (
    {
      className,
      count,
      size = "xsmall",
      maxCount = 99,
      shape = "rounded",
      ...rest
    },
    ref
  ) => {
    const getCount = () => {
      if (count === undefined) {
        return null;
      }
      if (count <= maxCount) {
        return `${count}`;
      }
      return `${maxCount}+`;
    };
    return (
      <Tag
        {...rest}
        ref={ref}
        size={size}
        className={cl("navds-counter-tag", className, `navds-tag--${shape}`)}
      >
        {getCount()}
      </Tag>
    );
  }
);

export default CounterTag;
