"use client";

import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Heading, Modal } from "@navikt/ds-react";
import styles from "./MobileNav.module.css";
import { useMobileNav } from "./MobileNav.provider";

function MobileNavDialog({ children }: { children: React.ReactNode }) {
  const { open, toggleOpen, focusRef } = useMobileNav();

  return (
    <Modal
      open={open}
      onClose={() => toggleOpen(false)}
      width="small"
      closeOnBackdropClick
      className={styles.mobileNavDialog}
      aria-labelledby="mobile-nav-menu"
    >
      <Modal.Header
        closeButton={false}
        className={styles.mobileNavDialogHeader}
      >
        <Heading level="1" size="medium" id="mobile-nav-menu">
          Aksel
        </Heading>
        <Button
          onClick={() => toggleOpen(false)}
          variant="secondary-neutral"
          icon={<XMarkIcon title="Lukk" />}
          ref={(ref) => {
            focusRef.current = ref;
          }}
        />
      </Modal.Header>
      {children}
    </Modal>
  );
}

export { MobileNavDialog };
