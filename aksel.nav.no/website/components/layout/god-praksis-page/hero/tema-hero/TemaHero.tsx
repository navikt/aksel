import cl from "clsx";
import { CSSProperties, useCallback, useState } from "react";
import { Box } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import { HeroCardList } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroCardList";
import { HeroIntro } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroIntro";
import { HeroSelectButton } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroSelectButton";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";
import styles from "../Hero.module.css";

type GpTemaHeroProps = { tema: GpTemaT | null } & HeroNavT;

function TemaHero({ tema, heroNav }: GpTemaHeroProps) {
  const [open, setOpen] = useState(false);

  const [dialogHeight, setDialogHeight] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [animationRef, setAnimationRef] = useState({ x: 0, y: 0 });

  const [openDialogButton, setOpenDialogButton] = useState<HTMLElement | null>(
    null,
  );
  const [closeDialogButton, setCloseDialogButton] =
    useState<HTMLElement | null>(null);

  const inlineStyles: CSSProperties = {
    "--aksel-website-hero-selector-x": animationRef.x + "px",
    "--aksel-website-hero-selector-y": animationRef.y + "px",
  };

  const handleOpen = (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  ) => {
    closeDialogButton?.focus();
    const rect = e.currentTarget.getBoundingClientRect();

    setAnimationRef({
      x: e.currentTarget.offsetLeft + rect.width / 2,
      y: e.currentTarget.offsetTop + rect.height / 2,
    });
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    openDialogButton?.focus();
  }, [openDialogButton]);

  useEscapeKeydown(handleClose, [handleClose]);

  /**
   * Tries to equal height for both wrapper and absolute-element
   * by increasing the margin-bottom of the wrapper
   */
  const getMargin = () => {
    if (!open) return 0;
    const height = dialogHeight ? dialogHeight - wrapperHeight : 0;
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
        ref={setOpenDialogButton}
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
        aria-label="Temanavigasjon"
        aria-modal="false"
        ref={(el) => {
          setDialogHeight(el?.getBoundingClientRect().height || 0);
        }}
      >
        <Cube variant="dark" />

        <HeroSelectButton
          onClick={handleClose}
          expanded={true}
          hidden={false}
          ref={setCloseDialogButton}
        />

        <HeroCardList
          currentSlug={tema?.slug}
          heroNav={heroNav}
          setOpen={setOpen}
        />
      </Box>
    </Box>
  );
}

export default TemaHero;
