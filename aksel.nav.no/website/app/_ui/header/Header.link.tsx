"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./Header.module.css";

type HeaderLinkProps = {
  name: string;
  href: string;
};

function HeaderLink({ name, href }: HeaderLinkProps) {
  const pathname = usePathname();

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
      onClick={() => umamiTrack("navigere", { kilde: "header", url: href })}
    >
      {name}
    </Link>
  );
}

export { HeaderLink };
