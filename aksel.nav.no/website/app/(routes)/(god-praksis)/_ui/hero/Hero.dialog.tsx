"use client";

import { Box } from "@navikt/ds-react";
import { GodPraksisHeroButton } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero.button";
import { useGodPraksisHeroContext } from "@/app/(routes)/(god-praksis)/_ui/hero/Hero.provider";
import styles from "./Hero.module.css";

function GodPraksisHeroDialog({ children }: { children: React.ReactNode }) {
  const { dialogState, registerRef } = useGodPraksisHeroContext();

  return (
    <Box
      paddingInline={{ xs: "space-16", lg: "space-40" }}
      paddingBlock={{ xs: "space-16", lg: "space-40" }}
      className={styles.godPraksisHeroDialog}
      role="dialog"
      aria-label="Temanavigasjon"
      aria-modal="false"
      ref={registerRef.dialogRef}
      data-hidden={!dialogState.open}
    >
      <GodPraksisHeroButton inDialog />
      {children}
    </Box>
  );
}

export { GodPraksisHeroDialog };
