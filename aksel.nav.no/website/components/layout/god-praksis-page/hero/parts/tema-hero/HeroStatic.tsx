import cl from "clsx";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Box, Button, Heading } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import Cube from "@/layout/god-praksis-page/hero/Cube";
import { HeroList } from "@/layout/god-praksis-page/hero/parts/HeroList";
import { TemaSelectButton } from "@/layout/god-praksis-page/hero/parts/tema-hero/SelectButton";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";
import styles from "../../Hero.module.css";

type GpTemaHeroStaticProps = { tema: GpTemaT | null } & HeroNavT;

export function TemaHeroStatic({ tema, heroNav }: GpTemaHeroStaticProps) {
  const [open, setOpen] = useState(false);

  const currentSelected = useRef<HTMLElement | null>(null);
  const [animationRef, setAnimationRef] = useState({ x: 0, y: 0 });

  const [dialogButton, setDialogButton] = useState<HTMLElement | null>(null);

  /* TODO: Fikse typer */
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
      x: e.clientX ? e.clientX - e.currentTarget.offsetLeft / 2 : xRect,
      y: e.clientY ? e.clientY - e.currentTarget.offsetTop / 3 : yRect,
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
    open && currentSelected.current?.focus();
  }, [open]);

  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className="relative bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100 transition-[height]"
    >
      <Cube />

      <TemaSelectButton
        onClick={handleOpen}
        expanded={open}
        ref={setDialogButton}
      />
      <div className="relative z-10">
        <Heading
          level="1"
          size="xlarge"
          className="z-10 mt-2 text-aksel-heading"
        >
          {tema?.title}
        </Heading>
        {tema?.description && (
          <BodyLong size="large" className="relative z-10 mt-4">
            {tema.description}
          </BodyLong>
        )}
      </div>

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
          currentSelected={currentSelected}
          currentSlug={tema?.slug}
          heroNav={heroNav}
          setOpen={setOpen}
        />
      </Box>
    </Box>
  );
}
