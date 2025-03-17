import { Show } from "@navikt/ds-react";
import { MobileNavButton } from "./MobileNav.button";
import { MobileNavDialog } from "./MobileNav.dialog";
import { MobileNavProvider } from "./MobileNav.provider";

function MobileNav() {
  return (
    <Show below="lg">
      <MobileNavProvider>
        <MobileNavButton />
        <MobileNavDialog />
      </MobileNavProvider>
    </Show>
  );
}

export { MobileNav };
