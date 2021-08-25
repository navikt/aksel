import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface BodyLongProps {
  props: {
    /**
     * medium: 18px, small: 16px
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

const BodyLong: OverridableComponent<BodyLongProps> = forwardRef(
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
      className={cl(className, "navds-body-long", {
        "navds-body--small": size === "small",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default BodyLong;
