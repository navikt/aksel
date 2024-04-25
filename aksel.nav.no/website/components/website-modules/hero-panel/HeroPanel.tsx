import cl from "clsx";
import { forwardRef } from "react";
import styles from "./HeroPanel.module.css";

type HeroPanelProps = {
  children: React.ReactNode;
  variant: "god-praksis" | "god-praksis-inverted" | "komponent";
  style?: React.CSSProperties;
  className?: string;
  role?: "dialog";
  "aria-label"?: string;
  "aria-modal"?: boolean;
};

/**
 * HeroPanel generic for a unified hero-look across landing pages
 */
export const HeroPanel = forwardRef<HTMLDivElement, HeroPanelProps>(
  (
    { children, variant, style: _style, className, ...rest }: HeroPanelProps,
    ref,
  ) => {
    const style: React.CSSProperties = {
      ..._style,
    };

    return (
      <div
        {...rest}
        ref={ref}
        data-variant={variant}
        className={cl(
          className,
          "rounded-large px-4 py-6 ring-1 ring-inset lg:px-10 lg:py-10",
          "transition-[margin] duration-500",
          styles.heroGradient,
          {
            "ring-teal-400": variant === "god-praksis",
            "ring-teal-500": variant === "god-praksis-inverted",
          },
        )}
        style={style}
      >
        {children}
      </div>
    );
  },
);
