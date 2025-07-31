"use client";

import { BodyShort, Box, Heading, Modal } from "@navikt/ds-react";
import { Kbd } from "@/app/_ui/kbd/Kbd";
import styles from "./GlobalSearch.module.css";
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
      aria-labelledby="aksel-search-heading"
      closeOnBackdropClick
      width="60rem"
    >
      <Heading level="1" size="medium" id="aksel-search-heading" visuallyHidden>
        Søk
      </Heading>
      {children}
      <BodyShort
        size="small"
        className={styles.searchDialogShortcuts}
        as="span"
      >
        <span>
          <Kbd>Ctrl</Kbd>
          <Box as="span" marginInline="space-2">
            +
          </Box>
          <Kbd>K</Kbd> for å søke
        </span>
        <span>
          <Kbd>Esc</Kbd> for å lukke
        </span>
      </BodyShort>
    </Modal>
  );
}

export { GlobalSearchDialog };
