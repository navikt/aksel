"use client";

import cl from "clsx";
import { ChevronDownUpIcon, ChevronUpDownIcon } from "@navikt/aksel-icons";
import { useGodPraksisHeroContext } from "@/app/dev/(god-praksis)/_ui/hero/Hero.provider";

function GodPraksisHeroButton({ inDialog }: { inDialog?: boolean }) {
  const { dialogState, registerRef } = useGodPraksisHeroContext();

  return (
    <button
      className={cl(
        "relative z-10 flex items-center gap-05 rounded-full py-1 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus",
        {
          "bg-teal-800 text-text-on-inverted focus-visible:shadow-focus-gap":
            dialogState.open,
          "bg-teal-50 text-text-default": !dialogState.open,
        },
      )}
      onClick={dialogState.toggleOpen}
      aria-expanded={dialogState.open}
      ref={
        inDialog
          ? registerRef.closeDialogButtonRef
          : registerRef.openDialogButtonRef
      }
      /* aria-hidden={hidden} */
      /* tabIndex={hidden ? -1 : 0} */
    >
      Tema
      {dialogState.open ? (
        <ChevronDownUpIcon aria-hidden className="shrink-0 text-2xl" />
      ) : (
        <ChevronUpDownIcon aria-hidden className="shrink-0 text-2xl" />
      )}
    </button>
  );
}

export { GodPraksisHeroButton };
