"use client";

import { HGrid } from "@navikt/ds-react";
import styles from "./MobileNav.module.css";

function MobileNavMenu({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HGrid
        columns="auto"
        marginInline="space-8"
        className={styles.mobileNavGroupSticky}
      >
        <a
          href="/designsystemet"
          className={`${styles.mobileNavItem} ${styles.mobileNavItemCentered}`}
        >
          Designsystemet
        </a>
      </HGrid>

      {children}
    </div>
  );
}

export { MobileNavMenu };
