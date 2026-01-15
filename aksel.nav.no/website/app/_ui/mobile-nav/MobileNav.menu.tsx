"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { HGrid, VStack } from "@navikt/ds-react";
import styles from "./MobileNav.module.css";

function MobileNavMenu({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [open, setOpen] = useState(pathName?.startsWith("/designsystemet"));

  return open ? (
    <DesignsystemView toggleClose={() => setOpen(false)}>
      {children}
    </DesignsystemView>
  ) : (
    <InitialView toggleOpen={() => setOpen(true)} />
  );
}

function InitialView({ toggleOpen }: { toggleOpen: () => void }) {
  return (
    <VStack marginInline="space-8" position="relative">
      <HGrid columns="1fr auto">
        <a href="/designsystemet" className={styles.mobileNavItem}>
          Designsystemet
        </a>
        <button
          className={styles.mobileNavItem}
          onClick={toggleOpen}
          aria-expanded="false"
        >
          <ChevronDownIcon title="Åpne designsystem-meny" fontSize="1.5rem" />
        </button>
      </HGrid>
      <span className={styles.divider} />

      <Link href="/god-praksis" className={styles.mobileNavItem}>
        God praksis
      </Link>
      <span className={styles.divider} />
      <Link href="/produktbloggen" className={styles.mobileNavItem}>
        Bloggen
      </Link>
    </VStack>
  );
}

function DesignsystemView({
  children,
  toggleClose,
}: {
  children: React.ReactNode;
  toggleClose: () => void;
}) {
  return (
    <div>
      <HGrid
        columns="auto 1fr"
        marginInline="space-8"
        className={styles.mobileNavGroupSticky}
      >
        <button
          className={styles.mobileNavItem}
          onClick={toggleClose}
          aria-expanded="true"
        >
          <ArrowLeftIcon title="Lukk designsystem-meny" fontSize="1.5rem" />
        </button>

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
