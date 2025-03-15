"use client";

import { Heading, Modal } from "@navikt/ds-react";
import { useGlobalSearch } from "./GlobalSearch.provider";

function GlobalSearchDialog({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useGlobalSearch();
  const close = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={close}
      onKeyDown={(e) => {
        /* Avoids sideeffects when closing Modal */
        if (e.key === "Escape") {
          e.stopPropagation();
        }
      }}
      className="md:h-[90%] md:max-h-[52rem]"
      width="medium"
      aria-labelledby="aksel-search-heading"
      closeOnBackdropClick
    >
      <Heading level="1" size="medium" id="aksel-search-heading" visuallyHidden>
        Søk
      </Heading>
      {children}
    </Modal>
  );
}

export { GlobalSearchDialog };
