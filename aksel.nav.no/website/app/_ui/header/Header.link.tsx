"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type HeaderLinkProps = {
  name: string;
  href: string;
  prefetch?: boolean;
};

function HeaderLink({ name, href, prefetch = undefined }: HeaderLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      prefetch={prefetch}
      data-current={pathname?.startsWith(href) ? "true" : "false"}
      className={styles.headerLink}
      data-umami-event="navigere"
      data-umami-event-kilde="header"
    >
      {name}
    </Link>
  );
}

export { HeaderLink };
