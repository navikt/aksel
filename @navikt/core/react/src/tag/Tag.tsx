import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort, Detail } from "..";
import { useSizeManager } from "../app-provider/hooks";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Tag label
   */
  children: React.ReactNode;
  /**
   * Changes background and border color
   */
  variant: "warning" | "error" | "info" | "success";
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, ...rest }, ref) => {
    const sizeCtx = useSizeManager<TagProps["size"]>(size);

    const Component = sizeCtx === "medium" ? BodyShort : Detail;

    return (
      <Component
        {...rest}
        ref={ref}
        as="span"
        size={sizeCtx}
        className={cl(
          "navds-tag",
          className,
          `navds-tag--${variant}`,
          `navds-tag--${sizeCtx}`
        )}
      />
    );
  }
);

export default Tag;
