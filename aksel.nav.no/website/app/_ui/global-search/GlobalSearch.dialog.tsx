"use client";

import { BodyShort, Box, Dialog, Heading } from "@navikt/ds-react";
import { Kbd } from "@/app/_ui/kbd/Kbd";
import styles from "./GlobalSearch.module.css";

function GlobalSearchDialog({
  children,
  isMac,
}: {
  children: React.ReactNode;
  isMac: boolean;
}) {
  return (
    <Dialog.Popup
      position="center"
      width="large"
      withBackdrop
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
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Box as="span" marginInline="space-2">
            +
          </Box>
          <Kbd>K</Kbd> for å søke
        </span>
        <span>
          <Kbd>Esc</Kbd> for å lukke
        </span>
      </BodyShort>
    </Dialog.Popup>
  );
}

export { GlobalSearchDialog };
