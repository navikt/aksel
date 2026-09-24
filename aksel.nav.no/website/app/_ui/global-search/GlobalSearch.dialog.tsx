"use client";

import { BodyShort, Dialog, Heading } from "@navikt/ds-react";
import { Kbd } from "@/app/_ui/kbd/Kbd";
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
          <Kbd>Enter</Kbd> gå til side
        </span>
        <span>
          <Kbd>Esc</Kbd> for å lukke
        </span>
      </BodyShort>
    </Dialog.Popup>
  );
}

export { GlobalSearchDialog };
