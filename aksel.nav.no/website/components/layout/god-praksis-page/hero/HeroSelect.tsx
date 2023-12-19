import cl from "clsx";
import Link from "next/link";
import { useRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, Modal } from "@navikt/ds-react";
import { HeroNavT } from "@/layout/god-praksis-page/types";

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
        className="shadow-xsmall flex gap-05 py-05 pl-4 pr-2 items-center bg-surface-subtle rounded-full focus:outline-none focus:shadow-focus"
        onClick={() => modalRef.current?.showModal()}
      >
        Tema
        <ChevronDownIcon aria-hidden className="shrink-0 text-2xl" />
      </BodyShort>

      <Modal
        ref={modalRef}
        header={{ heading: "Tema" }}
        width="small"
        closeOnBackdropClick
      >
        <Modal.Body>
          <nav aria-label="hovedmeny">
            <ul>
              <li className="my-2 flex h-11 items-center">
                <Link
                  href="/gp"
                  className={cl(
                    "hover:bg-surface-action-subtle-hover text-text-default focus-visible:shadow-focus relative flex h-full w-full items-center rounded px-2 focus:outline-none",
                    {
                      "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
                        false,
                    }
                  )}
                  onClick={() => {
                    modalRef.current?.close();
                  }}
                >
                  Alle tema
                </Link>
              </li>
              {heroNav.map((x) => (
                <li className="my-2 flex h-11 items-center" key={x.slug}>
                  <Link
                    href={`/gp/${x.slug}`}
                    className={cl(
                      "hover:bg-surface-action-subtle-hover text-text-default focus-visible:shadow-focus relative flex h-full w-full items-center rounded px-2 focus:outline-none",
                      {
                        "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
                          currentSlug === x.slug,
                      }
                    )}
                    onClick={() => {
                      modalRef.current?.close();
                    }}
                  >
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default HeroSelect;
