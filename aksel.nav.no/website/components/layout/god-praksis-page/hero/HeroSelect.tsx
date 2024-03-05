import cl from "clsx";
import Link from "next/link";
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Chips } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import { HeroNavT } from "@/layout/god-praksis-page/interface";
import styles from "./Hero.module.css";

function HeroSelect({
  heroNav,
  currentSlug,
}: {
  heroNav: HeroNavT["heroNav"];
  currentSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const [animationRef, setAnimationRef] = useState({ x: 0, y: 0 });

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

  return (
    <>
      <BodyShort
        size="large"
        as="button"
        className="flex items-center gap-05 rounded-full bg-surface-subtle py-1 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus"
        onClick={handleOpen}
        ref={setDialogButton}
        aria-expanded={open}
      >
        Tema
        <ChevronDownIcon aria-hidden className="shrink-0 text-2xl" />
      </BodyShort>

      <Box
        background="surface-default"
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
        <Button
          variant="tertiary-neutral"
          icon={<XMarkIcon title="Lukk temavelger" />}
          onClick={handleClose}
          className="absolute right-4 top-4"
        />
        <BodyShort size="large" className="py-1" id="tema-selector-title">
          Tema
        </BodyShort>
        <nav aria-label="Temavelger" className="mt-2 max-w-2xl">
          <Chips>
            <Chips.Toggle
              as={Link}
              href="/gp"
              onClick={() => {
                setOpen(false);
              }}
              checkmark={false}
              variant="neutral"
            >
              Alle tema
            </Chips.Toggle>
            {heroNav.map((x, idx) => (
              <Chips.Toggle
                key={x.slug + idx}
                as={Link}
                href={`/gp/${x.slug}`}
                onClick={() => {
                  setOpen(false);
                }}
                checkmark={false}
                variant="neutral"
                selected={currentSlug === x.slug}
                aria-current={currentSlug === x.slug ? "page" : undefined}
                ref={(element: HTMLAnchorElement) => {
                  if (currentSlug === x.slug) {
                    currentSelected.current = element;
                  }
                }}
              >
                {x.title}
              </Chips.Toggle>
            ))}
          </Chips>
        </nav>
      </Box>
    </>
  );
}
export default HeroSelect;
