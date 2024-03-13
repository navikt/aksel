import cl from "clsx";
import { CSSProperties, useCallback, useRef, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Box } from "@navikt/ds-react";
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

  /* TODO: Fikse typer, unngå `as` */
  const inlineStyles = {
    "--aksel-website-hero-selector-x": animationRef.x + "px",
    "--aksel-website-hero-selector-y": animationRef.y + "px",
  } as CSSProperties;

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
      />

      <Box
        borderRadius="large"
        paddingInline={{ xs: "8", lg: "14" }}
        paddingBlock="10 6"
        className={cl(
          "absolute inset-0 z-20 ring-1 ring-teal-700",
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

        <button
          onClick={handleClose}
          data-theme="dark"
          className="absolute right-4 top-4 z-20 grid size-12 place-content-center rounded-medium outline-none hover:bg-gray-50/10 focus-visible:shadow-focus-inverted"
        >
          <XMarkIcon title="Lukk temavelger" fontSize="1.5rem" />
        </button>

        <BodyShort
          size="large"
          className="relative z-10 py-1 text-text-on-inverted"
          id="tema-selector-title"
          weight="semibold"
        >
          Tema
        </BodyShort>
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
