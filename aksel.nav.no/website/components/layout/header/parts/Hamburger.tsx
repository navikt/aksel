import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { Button, Modal, Show } from "@navikt/ds-react";
import { useState } from "react";
import HamburgerLink from "./HamburgerLink";

export const Hamburger = () => {
  const [open, setOpen] = useState(false);
  return (
    <Show below="lg">
      <Button
        variant="tertiary-neutral"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        icon={
          <MenuHamburgerIcon
            fontSize="2rem"
            className="pointer-events-none"
            title="Åpne meny"
          />
        }
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Meny" }}
        width="small"
        closeOnBackdropClick
      >
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </Show>
  );
};
