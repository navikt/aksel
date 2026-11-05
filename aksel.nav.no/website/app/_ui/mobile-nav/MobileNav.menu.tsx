"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { HGrid, VStack } from "@navikt/ds-react";
import { useMobileNav } from "@/app/_ui/mobile-nav/MobileNav.provider";
import { NextLink } from "@/app/_ui/next-link/NextLink";
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
  const context = useMobileNav();
  return (
    <VStack marginInline="space-8" position="relative">
      <HGrid columns="1fr auto">
        <NextLink
          prefetch={false}
          href="/designsystemet"
          className={styles.mobileNavItem}
          onNavigate={() => context.toggleOpen()}
        >
          Designsystemet
        </NextLink>
        <button
          className={styles.mobileNavItem}
          onClick={toggleOpen}
          aria-expanded="false"
          type="button"
        >
          <ChevronDownIcon title="Åpne designsystem-meny" fontSize="1.5rem" />
        </button>
      </HGrid>
      <span className={styles.divider} />

      <NextLink href="/god-praksis" className={styles.mobileNavItem}>
        God praksis
      </NextLink>
      <span className={styles.divider} />
      <NextLink href="/produktbloggen" className={styles.mobileNavItem}>
        Bloggen
      </NextLink>
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
  const context = useMobileNav();
  return (
    <div>
      <HGrid
        columns="auto 1fr"
        marginInline="space-8"
        className={styles.mobileNavGroupSticky}
      >
        <button
          type="button"
          className={styles.mobileNavItem}
          onClick={toggleClose}
          aria-expanded="true"
        >
          <ArrowLeftIcon title="Lukk designsystem-meny" fontSize="1.5rem" />
        </button>

        <NextLink
          prefetch={false}
          href="/designsystemet"
          className={`${styles.mobileNavItem} ${styles.mobileNavItemCentered}`}
          onNavigate={() => context.toggleOpen()}
        >
          Designsystemet
        </NextLink>
      </HGrid>

      {children}
    </div>
  );
}

export { MobileNavMenu };
