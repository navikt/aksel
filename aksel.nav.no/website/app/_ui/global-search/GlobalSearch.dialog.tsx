"use client";

import { BodyShort, Heading, Modal } from "@navikt/ds-react";
import KBD from "@/web/KBD";
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
        <div>
          <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> for å søke
        </div>
        <div>
          <Kbd>Esc</Kbd> for å lukke
        </div>
      </BodyShort>
    </Modal>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <KBD>{children}</KBD>;
}

export { GlobalSearchDialog };
