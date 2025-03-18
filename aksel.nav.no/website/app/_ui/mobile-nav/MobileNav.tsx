import { Sidebar } from "@/app/_ui/sidebar/Sidebar";
import { MobileNavButton } from "./MobileNav.button";
import { MobileNavDialog } from "./MobileNav.dialog";
import { MobileNavMenu } from "./MobileNav.menu";
import { MobileNavProvider } from "./MobileNav.provider";

/* TODO: avoid "new"section for ds, just show all lings on same menu like primer? */
async function MobileNav() {
  return (
    <MobileNavProvider>
      <MobileNavButton />
      <MobileNavDialog>
        <MobileNavMenu>
          <Sidebar layout="mobile" />
        </MobileNavMenu>
      </MobileNavDialog>
    </MobileNavProvider>
  );
}

export { MobileNav };
