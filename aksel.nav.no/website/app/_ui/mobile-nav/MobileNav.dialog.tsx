"use client";

import { Modal } from "@navikt/ds-react";
import { useMobileNav } from "./MobileNav.provider";

function MobileNavDialog() {
  const { open, toggleOpen } = useMobileNav();

  return (
    <Modal
      open={open}
      onClose={() => toggleOpen(false)}
      header={{ heading: "Meny" }}
      width="small"
      closeOnBackdropClick
    >
      <div>123</div>
      {/* <Modal.Body>
          <nav aria-label="hovedmeny">
            <ul>
              <HamburgerLink
                onClick={() => setOpen(false)}
                name="God praksis"
                href="/god-praksis"
              />
              <HamburgerLink
                onClick={() => setOpen(false)}
                name="Grunnleggende"
                href="/grunnleggende"
              />
              <HamburgerLink
                onClick={() => setOpen(false)}
                name="Ikoner"
                href="/ikoner"
              />
              <HamburgerLink
                onClick={() => setOpen(false)}
                name="Komponenter"
                href="/komponenter"
              />
              <HamburgerLink
                onClick={() => setOpen(false)}
                name="Mønster & Maler"
                href="/monster-maler"
              />
              <HamburgerLink
                onClick={() => setOpen(false)}
                name="Blogg"
                href="/produktbloggen"
              />
            </ul>
          </nav>
        </Modal.Body> */}
    </Modal>
  );
}

export { MobileNavDialog };
