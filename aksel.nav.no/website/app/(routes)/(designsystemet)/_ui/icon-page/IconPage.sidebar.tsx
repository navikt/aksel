"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import meta from "@navikt/aksel-icons/metadata";
import { Dialog } from "@navikt/ds-react";
import styles from "./IconPage.module.css";
import { useIconPage } from "./IconPage.provider";

function IconPageSidebar({
  children,
  iconName,
}: {
  children: React.ReactNode;
  iconName?: keyof typeof meta;
}) {
  const { activeIconButton, hideDialog } = useIconPage();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("iconName");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {(hideDialog || !iconName) && (
        <section
          aria-label={iconName ? `Ikon ${iconName}` : "Kom i gang med ikoner"}
          id="icon-page-sidepanel"
          className={styles.iconPageSidebar}
        >
          {children}
        </section>
      )}

      <Dialog
        open={!!iconName && !hideDialog}
        aria-label={`${iconName} ikon`}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            handleClose();
          }
        }}
      >
        <Dialog.Popup returnFocusTo={() => activeIconButton}>
          {!hideDialog && iconName && children}
        </Dialog.Popup>
      </Dialog>
    </>
  );
}

export { IconPageSidebar };
