"use client";

import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useMobileNav } from "./MobileNav.provider";

function MobileNavButton() {
  const { open, toggleOpen } = useMobileNav();

  return (
    <Button
      variant="secondary-neutral"
      aria-expanded={open}
      icon={<MenuHamburgerIcon title="Åpne meny" />}
      onClick={() => toggleOpen()}
    />
  );
}

export { MobileNavButton };
