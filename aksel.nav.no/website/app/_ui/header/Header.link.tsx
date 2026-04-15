"use client";

import { usePathname } from "next/navigation";
import { Events } from "@navikt/analytics-types";
import { NextLink } from "@/app/_ui/next-link/NextLink";
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

  const active = isActive();

  return (
    <NextLink
      href={href}
      prefetch={false}
      data-current={active}
      aria-current={active ? true : undefined}
      className={styles.headerLink}
      onClick={() =>
        umamiTrack(Events.NAVIGERE, {
          lenketekst: name,
          destinasjon: href,
          lenkegruppe: "header",
        })
      }
    >
      {name}
    </NextLink>
  );
}

export { HeaderLink };
