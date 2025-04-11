"use client";

import cl from "clsx";
import { Box } from "@navikt/ds-react";
import { GodPraksisHeroButton } from "@/app/dev/(god-praksis)/_ui/hero/Hero.button";
import { useGodPraksisHeroContext } from "@/app/dev/(god-praksis)/_ui/hero/Hero.provider";
import styles from "./Hero.module.css";

function GodPraksisHeroDialog({ children }: { children: React.ReactNode }) {
  const { dialogState, registerRef } = useGodPraksisHeroContext();

  return (
    <Box
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className={cl(
        "absolute inset-0 z-20 overflow-clip ring-1 ring-teal-500",
        styles.heroSelector,
        styles.heroGradientOpen,
        {
          hidden: !dialogState.open,
        },
      )}
      role="dialog"
      aria-label="Temanavigasjon"
      aria-modal="false"
      ref={registerRef.dialogRef}
    >
      <GodPraksisHeroButton inDialog />
      {children}
    </Box>
  );
}

export { GodPraksisHeroDialog };
