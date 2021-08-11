import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface DetailProps {
  props: {
    /**
     * M: 18px, S: 16px
     * @default "m"
     */
    size?: "m" | "s";
    /**
     * Paragraph text
     */
    children: React.ReactNode;
    /**
     * Adds margins to typo
     */
    spacing?: boolean;
  } & React.HTMLAttributes<HTMLParagraphElement>;
  defaultComponent: "p";
}

const Detail: OverridableComponent<DetailProps> = forwardRef(
  (
    { className, size = "m", spacing, component: Component = "p", ...rest },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-detail", {
        "navds-detail--s": size === "s",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Detail;
