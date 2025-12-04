"use client";

import { Dialog } from "@navikt/ds-react";
import styles from "./MobileNav.module.css";
import { useMobileNav } from "./MobileNav.provider";

function MobileNavDialog({ children }: { children: React.ReactNode }) {
  const { open, toggleOpen } = useMobileNav();

  return (
    <Dialog open={open} onOpenChange={() => toggleOpen(false)}>
      <Dialog.Popup
        width="400px"
        closeOnOutsideClick
        position="right"
        className={styles.mobileNavDialogPopup}
      >
        <Dialog.Header>
          <Dialog.Title>Aksel</Dialog.Title>
        </Dialog.Header>
        {children}
      </Dialog.Popup>
    </Dialog>
  );
}

export { MobileNavDialog };
