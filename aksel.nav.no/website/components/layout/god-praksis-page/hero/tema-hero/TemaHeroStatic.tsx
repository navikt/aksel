import cl from "clsx";
import { CSSProperties, useCallback, useRef, useState } from "react";
import { Box } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import { HeroList } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroCardList";
import { HeroIntro } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroIntro";
import { HeroSelectButton } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroSelectButton";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";
import styles from "./TemaHero.module.css";

type GpTemaHeroStaticProps = { tema: GpTemaT | null } & HeroNavT;

export function TemaHeroStatic({ tema, heroNav }: GpTemaHeroStaticProps) {
  const [open, setOpen] = useState(false);

  const [boxHeight, setBoxHeight] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const currentlyActiveLink = useRef<HTMLElement | null>(null);
  const [animationRef, setAnimationRef] = useState({ x: 0, y: 0 });

  const [dialogButton, setDialogButton] = useState<HTMLElement | null>(null);

  const inlineStyles: CSSProperties = {
    "--aksel-website-hero-selector-x": animationRef.x + "px",
    "--aksel-website-hero-selector-y": animationRef.y + "px",
  };

  const handleOpen = (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setAnimationRef({
      x: e.currentTarget.offsetLeft + rect.width / 2,
      y: e.currentTarget.offsetTop + rect.height / 2,
    });
    setOpen(true);

    /**
     * Since the dialog is not rendered until the next cycle,
     * we need to wait for display: none to be removed before.
     */
    setTimeout(() => {
      currentlyActiveLink.current?.focus();
    }, 0);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    dialogButton?.focus();
  }, [dialogButton]);

  useEscapeKeydown(handleClose, [handleClose]);

  /**
   * Tries to equal height for both wrapper and absolute-element
   * by increasing the margin-bottom of the wrapper
   */
  const getMargin = () => {
    if (!open) return 0;
    const height = boxHeight ? boxHeight - wrapperHeight : 0;
    if (height > 0) return height;
    return 0;
  };

  return (
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
      <Cube />
      <HeroSelectButton
        onClick={handleOpen}
        expanded={open}
        ref={setDialogButton}
        hidden={open}
      />
      <HeroIntro
        title={tema?.title}
        description={tema?.description}
        hidden={open}
        image={tema?.image}
      />

      <Box
        borderRadius="large"
        paddingInline={{ xs: "4", lg: "10" }}
        paddingBlock="10 6"
        className={cl(
          "absolute inset-0 z-20 overflow-clip ring-1 ring-teal-500",
          styles.heroSelector,
          styles.heroGradientOpen,
          {
            hidden: !open,
          },
        )}
        shadow="medium"
        style={inlineStyles}
        role="dialog"
        aria-labelledby="tema-selector-title"
        aria-modal="false"
        ref={(el) => {
          setBoxHeight(el?.getBoundingClientRect().height || 0);
        }}
      >
        <Cube variant="dark" />

        <HeroSelectButton
          onClick={handleClose}
          expanded={true}
          hidden={false}
        />

        <HeroList
          currentlyActiveLink={currentlyActiveLink}
          currentSlug={tema?.slug}
          heroNav={heroNav}
          setOpen={setOpen}
        />
      </Box>
    </Box>
  );
}
