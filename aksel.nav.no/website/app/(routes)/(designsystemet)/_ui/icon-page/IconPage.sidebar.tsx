"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import meta from "@navikt/aksel-icons/metadata";
import { Modal } from "@navikt/ds-react";
import styles from "./IconPage.module.css";
import { useIconPage } from "./IconPage.provider";

function IconPageSidebar({
  children,
  iconName,
}: {
  children: React.ReactNode;
  iconName?: keyof typeof meta;
}) {
  const { activeIconButton, hideModal } = useIconPage();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("iconName");
    replace(`${pathname}?${params.toString()}`);
    activeIconButton?.focus();
  };

  return (
    <>
      {(hideModal || !iconName) && (
        <section
          aria-label={iconName ? `Ikon ${iconName}` : "Kom i gang med ikoner"}
          id="icon-page-sidepanel"
          className={styles.iconPageSidebar}
        >
          {children}
        </section>
      )}

      {!hideModal && iconName && (
        <Modal
          open={!!iconName}
          aria-label={`${iconName} ikon`}
          onClose={handleClose}
          data-modal={true}
        >
          {children}
        </Modal>
      )}
    </>
  );
}

export { IconPageSidebar };
