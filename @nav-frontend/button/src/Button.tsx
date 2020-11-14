import React, { forwardRef, useRef } from "react";
import cl from "classnames";
import "@nav-frontend/button-styles";

interface SharedProps {
  variant?: "primary" | "secondary" | "action" | "danger";
}

interface ButtonProps
  extends SharedProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
}

interface LinkProps
  extends SharedProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
  ref?: React.MutableRefObject<HTMLAnchorElement | null>;
}

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  | Pick<LinkProps, Exclude<keyof LinkProps, "ref">>
  | Pick<ButtonProps, Exclude<keyof ButtonProps, "ref">>
>((props, ref) => {
  const className = cl(
    props.className,
    "navds-button",
    `navds-button--${props.variant || "primary"}`
  );
  return props.as === "a" ? (
    <a
      {...props}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={className}
    >
      {props.children}
    </a>
  ) : (
    <button
      {...props}
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
    />
  );
});

export default Button;
