"use client";

import { BodyShort, Heading, Modal } from "@navikt/ds-react";
import { Kbd } from "@/app/_ui/kbd/Kbd";
import { useGlobalSearch } from "./GlobalSearch.provider";

function GlobalSearchDialog({ children }: { children: React.ReactNode }) {
  const { open, closeSearch } = useGlobalSearch();

  return (
    <Modal
      open={open}
      onClose={closeSearch}
      placement="top"
      onKeyDown={(e) => {
        /* Avoids sideeffects when closing Modal */
        if (e.key === "Escape") {
          e.stopPropagation();
        }
      }}
      width="medium"
      aria-labelledby="aksel-search-heading"
      closeOnBackdropClick
    >
      <Heading level="1" size="medium" id="aksel-search-heading" visuallyHidden>
        Søk
      </Heading>
      {children}
      <BodyShort
        size="small"
        className="flex items-baseline justify-between border-t border-t-border-subtle p-4 leading-none"
        as="span"
      >
        <span>
          <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> for å søke
        </span>
        <span>
          <Kbd>Esc</Kbd> for å lukke
        </span>
      </BodyShort>
    </Modal>
  );
}

export { GlobalSearchDialog };
