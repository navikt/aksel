import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface BodyLongProps {
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

const BodyLong: OverridableComponent<BodyLongProps> = forwardRef(
  (
    { className, size = "m", spacing, component: Component = "p", ...rest },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-body-long", {
        "navds-body--s": size === "s",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default BodyLong;
