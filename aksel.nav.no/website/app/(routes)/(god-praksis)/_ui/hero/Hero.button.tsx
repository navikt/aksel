"use client";

import { ChevronDownUpIcon, ChevronUpDownIcon } from "@navikt/aksel-icons";
import { useGodPraksisHeroContext } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero.provider";
import styles from "./Hero.module.css";

function GodPraksisHeroButton({ inDialog }: { inDialog?: boolean }) {
  const { dialogState, registerRef } = useGodPraksisHeroContext();

  let hidden = dialogState.open;
  if (inDialog) {
    hidden = !dialogState.open;
  }

  return (
    <button
      className={styles.godPraksisHeroButton}
      data-open={dialogState.open}
      data-hidden={hidden}
      onClick={dialogState.toggleOpen}
      aria-expanded={dialogState.open}
      ref={
        inDialog
          ? registerRef.closeDialogButtonRef
          : registerRef.openDialogButtonRef
      }
      aria-hidden={hidden}
      inert={hidden}
    >
      Tema
      {dialogState.open ? (
        <ChevronDownUpIcon
          aria-hidden
          fontSize="1.5rem"
          className={styles.godPraksisHeroButtonIcon}
        />
      ) : (
        <ChevronUpDownIcon
          aria-hidden
          fontSize="1.5rem"
          className={styles.godPraksisHeroButtonIcon}
        />
      )}
    </button>
  );
}

export { GodPraksisHeroButton };
