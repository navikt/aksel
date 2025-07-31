import { DesignsystemSidebar } from "@/app/(routes)/(designsystemet)/_ui/sidebar/Sidebar";
import { MobileNavButton } from "./MobileNav.button";
import { MobileNavDialog } from "./MobileNav.dialog";
import { MobileNavMenu } from "./MobileNav.menu";
import { MobileNavProvider } from "./MobileNav.provider";

async function MobileNav() {
  return (
    <MobileNavProvider>
      <MobileNavButton />
      <MobileNavDialog>
        <MobileNavMenu>
          <DesignsystemSidebar layout="mobile" />
        </MobileNavMenu>
      </MobileNavDialog>
    </MobileNavProvider>
  );
}

export { MobileNav };
