"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal, Show } from "@navikt/ds-react";
import { IconPageDetails } from "./IconPage.details";
import styles from "./IconPage.module.css";
import { useIconPage } from "./IconPage.provider";

function IconPageSidepanel({ iconName }: { iconName?: string }) {
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
      <Show above="xl">
        <section
          aria-label={iconName ? `Ikon ${iconName}` : "Kom i gang med ikoner"}
          id="icon-page-sidepanel"
          className={styles.iconPageSidepanel}
        >
          <IconPageDetails iconName={iconName} />
        </section>
      </Show>
      {!hideModal && iconName && (
        <Modal
          open={!!iconName}
          aria-label={`${iconName} ikon`}
          onClose={handleClose}
          data-modal={true}
        >
          <IconPageDetails iconName={iconName} inModal />
        </Modal>
      )}
    </>
  );
}

export { IconPageSidepanel };
