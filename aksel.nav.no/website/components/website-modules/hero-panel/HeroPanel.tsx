import { forwardRef } from "react";

type HeroPanelProps = {
  variant: "god-praksis" | "komponent";
};

/**
 * HeroPanel generic for a unified hero-look across landing pages
 */
export const HeroPanel = forwardRef<HTMLDivElement, HeroPanelProps>(
  ({ variant, ...rest }: HeroPanelProps, ref) => {
    return (
      <div data-variant={variant} ref={ref} {...rest}>
        panel
      </div>
    );
  },
);

/*
<Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className={cl(
        "relative ring-1 ring-teal-400 transition-[margin] duration-500",
        styles.heroGradient,
      )}
      style={{
        marginBottom: getMargin(),
        transitionTimingFunction: open
          ? "cubic-bezier(0.3, 0, 0.15, 1)"
          : "cubic-bezier(0, 0.3, 0.15, 1)",
      }}
      ref={(el) => {
        setWrapperHeight(el?.getBoundingClientRect().height || 0);
      }}
    >

*/
