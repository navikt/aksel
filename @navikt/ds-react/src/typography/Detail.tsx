import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface DetailProps {
  props: {
    /**
     * medium: 14px bold, small: 14px
     * @default "medium"
     */
    size?: "medium" | "small";
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
    {
      className,
      size = "medium",
      spacing,
      component: Component = "p",
      ...rest
    },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-detail", {
        "navds-detail--small": size === "small",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Detail;
