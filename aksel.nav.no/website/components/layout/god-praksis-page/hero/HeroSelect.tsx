import cl from "clsx";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Chips } from "@navikt/ds-react";
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

  /* TODO: Fikse typer */
  const inlineStyles = {
    "--aksel-website-hero-selector-x": animationRef.x + "px",
    "--aksel-website-hero-selector-y": animationRef.y + "px",
  } as CSSProperties;

  const Selector = () => (
    <Box
      background="surface-default"
      borderRadius="large"
      paddingInline={{ xs: "8", lg: "14" }}
      paddingBlock="10 6"
      className={cl("absolute inset-0 z-20", styles.heroSelector)}
      shadow="medium"
      style={inlineStyles}
    >
      <Button
        variant="tertiary-neutral"
        icon={<XMarkIcon title="lukk temavelger" />}
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4"
      />
      <BodyShort size="large" className="py-05">
        Tema
      </BodyShort>
      <nav aria-label="hovedmeny" className="mt-2 max-w-2xl">
        <Chips>
          <Chips.Toggle
            as={Link}
            href="/gp"
            onClick={() => {
              setOpen(false);
            }}
            checkmark={false}
            variant="neutral"
            selected={!currentSlug}
          >
            Alle tema
          </Chips.Toggle>
          {heroNav.map((x) => (
            <Chips.Toggle
              key={x.slug}
              as={Link}
              href={`/gp/${x.slug}`}
              onClick={() => {
                setOpen(false);
              }}
              checkmark={false}
              variant="neutral"
              selected={currentSlug === x.slug}
            >
              {x.title}
            </Chips.Toggle>
          ))}
        </Chips>
      </nav>
    </Box>
  );

  return (
    <>
      <BodyShort
        size="large"
        as="button"
        className="flex items-center gap-05 rounded-full bg-surface-subtle py-05 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setOpen((x) => !x);

          const xRect = e.currentTarget.offsetLeft + rect.width / 2;
          const yRect = e.currentTarget.offsetTop + rect.height / 2;

          setAnimationRef({
            x: e.clientX ? e.clientX - e.currentTarget.offsetLeft / 2 : xRect,
            y: e.clientY ? e.clientY - e.currentTarget.offsetTop / 3 : yRect,
          });
        }}
      >
        Tema
        <ChevronDownIcon aria-hidden className="shrink-0 text-2xl" />
      </BodyShort>
      {open && <Selector />}

      {/* <Modal
        ref={modalRef}
        header={{ heading: "Tema" }}
        width={500}
        closeOnBackdropClick
      >
        <Modal.Body>
          <nav aria-label="hovedmeny">
            <Chips className="justify-center">
              <Chips.Toggle
                as={Link}
                href="/gp"
                onClick={() => {
                  modalRef.current?.close();
                }}
                checkmark={false}
                variant="neutral"
                selected={!currentSlug}
              >
                Alle tema
              </Chips.Toggle>
              {heroNav.map((x) => (
                <Chips.Toggle
                  key={x.slug}
                  as={Link}
                  href={`/gp/${x.slug}`}
                  onClick={() => {
                    modalRef.current?.close();
                  }}
                  checkmark={false}
                  variant="neutral"
                  selected={currentSlug === x.slug}
                >
                  {x.title}
                </Chips.Toggle>
              ))}
            </Chips>
          </nav>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
export default HeroSelect;
