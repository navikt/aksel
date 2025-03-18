"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MoonIcon,
  SunIcon,
} from "@navikt/aksel-icons";
import { BodyShort, ToggleGroup } from "@navikt/ds-react";
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
    <div className={styles.mobileNavMenuIntialView}>
      <BodyShort as="ul" className={styles.mobileNavMenuList}>
        <li>
          <button className={styles.mobileNavMenuItem} onClick={toggleOpen}>
            Designsystemet
            <ArrowRightIcon aria-hidden fontSize="1.5rem" />
          </button>
        </li>
        <li>
          <Link href="/god-praksis" className={styles.mobileNavMenuItem}>
            God praksis
          </Link>
        </li>
        <li>
          <Link href="/produktbloggen" className={styles.mobileNavMenuItem}>
            Bloggen
          </Link>
        </li>
      </BodyShort>
      {/* TODO: Add theming support */}
      <ToggleGroup
        fill
        onChange={() => null}
        defaultValue="light"
        variant="neutral"
        className={styles.mobileNavMenuThemeToggle}
      >
        <ToggleGroup.Item
          value="light"
          icon={<SunIcon aria-hidden />}
          label="Light"
        />
        <ToggleGroup.Item
          value="dark"
          icon={<MoonIcon aria-hidden />}
          label="Dark"
        />
      </ToggleGroup>
    </div>
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
    <div className={styles.mobileNavSidebarMenu}>
      <button className={styles.mobileNavMenuItem} onClick={toggleClose}>
        <ArrowLeftIcon aria-hidden fontSize="1.5rem" />
        <span>Designsystemet</span>
        <span aria-hidden />
      </button>
      {children}
    </div>
  );
}

export { MobileNavMenu };
