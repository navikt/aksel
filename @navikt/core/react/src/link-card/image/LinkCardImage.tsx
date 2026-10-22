import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../utils/helpers";

type ImageAspectRatio = "1/1" | "16/9" | "16/10" | "4/3" | (string & {});

interface LinkCardImageProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box.
   * This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio.
   */
  aspectRatio?: ImageAspectRatio;
}

/**
 * @see 🏷️ {@link LinkCardImageProps}
 */
const LinkCardImage = forwardRef<HTMLDivElement, LinkCardImageProps>(
  (
    {
      children,
      className,
      aspectRatio,
      style,
      ...restProps
    }: LinkCardImageProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cl("aksel-link-card__image-container", className)}
        style={{
          ...style,
          aspectRatio,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

export { LinkCardImage };
export type { LinkCardImageProps };
