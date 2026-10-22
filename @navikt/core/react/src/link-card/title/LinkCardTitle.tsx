import React, { type HTMLAttributes, forwardRef } from "react";
import { Heading } from "../../typography";
import { cl } from "../../utils/helpers";
import { useLinkCardContext } from "../root/LinkCardRoot.context";

type LinkCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /**
   * Heading tag. Use "span" if you want a non header defining card
   * (eg. you have a lot of them all at once, such as in a grid)
   * @default "span"
   */
  as?: "span" | "h2" | "h3" | "h4" | "h5" | "h6";
};

/**
 * @see 🏷️ {@link LinkCardTitleProps}
 */
const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  (
    { children, as = "span", className, ...restProps }: LinkCardTitleProps,
    forwardedRef,
  ) => {
    const context = useLinkCardContext();

    return (
      <Heading
        ref={forwardedRef}
        as={as}
        size={context.size === "medium" ? "small" : "xsmall"}
        className={cl("aksel-link-card__title", className)}
        {...restProps}
      >
        {children}
      </Heading>
    );
  },
);

export { LinkCardTitle };
export type { LinkCardTitleProps };
