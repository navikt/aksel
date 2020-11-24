import * as React from "react";
import cls from "classnames";
import "@nav-frontend/chevron-styles";
import { forwardRef } from "react";

export interface ChevronProps {
  variant?: "right" | "left" | "up" | "down";
  className?: string;
}

const Chevron = forwardRef<HTMLElement, ChevronProps>(
  ({ className, variant = "right", ...rest }, ref) => (
    <i
      className={cls(className, `navds-chevron--${variant}`)}
      ref={ref}
      {...rest}
    />
  )
);

export default Chevron;
