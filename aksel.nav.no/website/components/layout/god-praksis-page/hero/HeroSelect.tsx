import cl from "clsx";
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Modal } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import { useMedia } from "@/hooks/useMedia";
import Cube from "@/layout/god-praksis-page/hero/Cube";
import { HeroList } from "@/layout/god-praksis-page/hero/parts/HeroList";
import { HeroNavT } from "@/layout/god-praksis-page/interface";
import styles from "./Hero.module.css";

function HeroSelect({
  heroNav,
  currentSlug,
  open,
  setOpen,
}: {
  heroNav: HeroNavT["heroNav"];
  currentSlug?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [animationRef, setAnimationRef] = useState({ x: 0, y: 0 });

  const hideModal = useMedia("screen and (min-width: 1024px)");

  const currentSelected = useRef<HTMLElement | null>(null);
  const [dialogButton, setDialogButton] = useState<HTMLElement | null>(null);

  /* TODO: Fikse typer */
  const inlineStyles = {
    "--aksel-website-hero-selector-x": animationRef.x + "px",
    "--aksel-website-hero-selector-y": animationRef.y + "px",
  } as CSSProperties;

  const handleOpen = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
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

  const List = () => (
    <>
      {hideModal ? (
        <Box
          background="surface-subtle"
          borderRadius="large"
          paddingInline={{ xs: "8", lg: "14" }}
          paddingBlock="10 6"
          className={cl("z-20", {
            hidden: !open,
            [styles.heroSelector]: hideModal,
            "absolute inset-0": hideModal,
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
            currentSlug={currentSlug}
            heroNav={heroNav}
            setOpen={setOpen}
          />
        </Box>
      ) : (
        <Box paddingInline="8" paddingBlock="0 6">
          <Cube variant="dark" />

          <HeroList
            currentSelected={currentSelected}
            currentSlug={currentSlug}
            heroNav={heroNav}
            setOpen={setOpen}
          />
        </Box>
      )}
    </>
  );

  return (
    <>
      <BodyShort
        size="large"
        as="button"
        className="relative z-10 flex items-center gap-05 rounded-full bg-surface-subtle py-1 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus"
        onClick={handleOpen}
        ref={setDialogButton}
        aria-expanded={open}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        Tema
        <ChevronDownIcon aria-hidden className="shrink-0 text-2xl" />
      </BodyShort>

      {hideModal ? (
        <List />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          header={{ heading: "Tema", closeButton: true }}
          className="bg-surface-subtle"
          width="small"
        >
          <List />
        </Modal>
      )}
    </>
  );
}

export default HeroSelect;
