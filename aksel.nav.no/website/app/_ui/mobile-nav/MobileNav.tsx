import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import {
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@navikt/ds-react/Dialog";
import { DesignsystemSidebar } from "@/app/(routes)/(designsystemet)/_ui/sidebar/Sidebar";
import { MobileNavMenu } from "./MobileNav.menu";
import styles from "./MobileNav.module.css";
import { MobileNavProvider } from "./MobileNav.provider";

async function MobileNav() {
  return (
    <MobileNavProvider>
      <DialogTrigger>
        <Button
          variant="secondary-neutral"
          icon={<MenuHamburgerIcon title="Åpne meny" />}
        />
      </DialogTrigger>
      <DialogPopup
        width="400px"
        closeOnOutsideClick
        position="right"
        className={styles.mobileNavDialogPopup}
      >
        <DialogHeader>
          <DialogTitle>Aksel</DialogTitle>
        </DialogHeader>
        <MobileNavMenu>
          <DesignsystemSidebar layout="mobile" />
        </MobileNavMenu>
      </DialogPopup>
    </MobileNavProvider>
  );
}

export { MobileNav };
