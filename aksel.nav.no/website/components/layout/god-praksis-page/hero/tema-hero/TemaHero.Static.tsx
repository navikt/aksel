import cl from "clsx";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";
import { HeroIntro } from "./TemaHero.Intro";
import { HeroList } from "./TemaHero.List";
import { TemaSelectButton } from "./TemaHero.Select";
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
    setOpen((x) => !x);

    const xRect = e.currentTarget.offsetLeft + rect.width / 2;
    const yRect = e.currentTarget.offsetTop + rect.height / 2;

    setAnimationRef({
      x: xRect,
      y: yRect,
    });
  };

  const handleClose = () => {
    setOpen(false);
    dialogButton?.focus();
  };

  useEscapeKeydown(() => {
    setOpen(false);
    dialogButton?.focus();
  }, [dialogButton]);

  useEffect(() => {
    open && currentlyActiveLink.current?.focus();
  }, [open]);

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
        "relative bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100 transition-[margin]",
        styles.marginTransition,
      )}
      /* style={{ minHeight: open && boxHeight ? boxHeight : "auto" }} */
      style={{ marginBottom: getMargin() }}
      ref={(el) => {
        setWrapperHeight(el?.getBoundingClientRect().height || 0);
      }}
    >
      <Cube />
      <TemaSelectButton
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
        background="surface-subtle"
        borderRadius="large"
        paddingInline={{ xs: "8", lg: "14" }}
        paddingBlock="10 6"
        className={cl("absolute inset-0 z-20", styles.heroSelector, {
          hidden: !open,
        })}
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

        <Button
          variant="tertiary-neutral"
          icon={<XMarkIcon title="Lukk temavelger" />}
          onClick={handleClose}
          className="absolute right-4 top-4 z-20"
        />
        <BodyShort
          size="large"
          className="relative z-10 py-1"
          id="tema-selector-title"
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
