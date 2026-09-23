"use client";

import { BodyShort, Box, Dialog, Heading } from "@navikt/ds-react";
import { Kbd, ModKbd } from "@/app/_ui/kbd/Kbd";
import styles from "./GlobalSearch.module.css";

function GlobalSearchDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Popup
      position="center"
      width="large"
      withBackdrop
      aria-labelledby="aksel-search-heading"
      initialFocusTo={() => document.getElementById("aksel-search-input")}
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
          <ModKbd />
          <Box as="span" marginInline="space-2">
            +
          </Box>
          <Kbd>K</Kbd> for å søke
        </span>
        <span className={styles.searchDialogShortcutsGroup}>
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> for å navigere
          </span>
          <span>
            <Kbd>↵</Kbd> for å åpne
          </span>
          <span>
            <Kbd>Esc</Kbd> for å lukke
          </span>
        </span>
      </BodyShort>
    </Dialog.Popup>
  );
}

export { GlobalSearchDialog };
