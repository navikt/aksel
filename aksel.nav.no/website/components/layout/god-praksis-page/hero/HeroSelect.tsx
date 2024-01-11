import Link from "next/link";
import { useRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, Chips, Modal } from "@navikt/ds-react";
import { HeroNavT } from "@/layout/god-praksis-page/interface";

function HeroSelect({
  heroNav,
  currentSlug,
}: {
  heroNav: HeroNavT["heroNav"];
  currentSlug?: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <BodyShort
        size="large"
        as="button"
        className="flex items-center gap-05 rounded-full bg-surface-subtle py-05 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus"
        onClick={() => modalRef.current?.showModal()}
      >
        Tema
        <ChevronDownIcon aria-hidden className="shrink-0 text-2xl" />
      </BodyShort>

      <Modal
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
      </Modal>
    </>
  );
}
export default HeroSelect;
