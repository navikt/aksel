"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type HeaderLinkProps = {
  name: string;
  href: string;
};

function HeaderLink({ name, href }: HeaderLinkProps) {
  let pathname = usePathname();

  if (pathname?.startsWith("/dev")) {
    pathname = pathname.replace("/dev", "");
  }

  const isActive = () => {
    if (pathname?.startsWith(href)) {
      return true;
    }

    if (name.toLocaleLowerCase() === "designsystemet") {
      return !!["/komponenter", "/grunnleggende", "/monster-maler"].find(
        (path) => pathname?.startsWith(path),
      );
    }

    return false;
  };

  return (
    <Link
      href={href}
      prefetch={false}
      data-current={isActive()}
      className={styles.headerLink}
      data-umami-event="navigere"
      data-umami-event-kilde="header"
    >
      {name}
    </Link>
  );
}

export { HeaderLink };
