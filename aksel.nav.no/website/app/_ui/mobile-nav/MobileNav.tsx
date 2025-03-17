import { Show } from "@navikt/ds-react";
import { Sidebar } from "@/app/_ui/sidebar/Sidebar";
import { MobileNavButton } from "./MobileNav.button";
import { MobileNavDialog } from "./MobileNav.dialog";
import { MobileNavMenu } from "./MobileNav.menu";
import { MobileNavProvider } from "./MobileNav.provider";

async function MobileNav() {
  return (
    <Show below="lg">
      <MobileNavProvider>
        <MobileNavButton />
        <MobileNavDialog>
          <MobileNavMenu>
            <Sidebar layout="mobile" />
          </MobileNavMenu>
        </MobileNavDialog>
      </MobileNavProvider>
    </Show>
  );
}

export { MobileNav };
