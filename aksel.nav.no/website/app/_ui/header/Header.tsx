"use server";

import Link from "next/link";
import { Box, HStack, Show, Spacer } from "@navikt/ds-react";
import { GlobalSearch } from "@/app/_ui/global-search/GlobalSearch";
import AkselLogo from "@/assets/Logo";
import { HeaderLink } from "./Header.link";
import styles from "./Header.module.css";

const LINKS = [
  { name: "God praksis", href: "/god-praksis" },
  /* { name: "Grunnleggende", href: "/grunnleggende" }, */
  /* { name: "Ikoner", href: "/ikoner" }, */
  { name: "Designsystemet", href: "/komponenter-2" },
  /* { name: "Mønster & Maler", href: "/monster-maler" }, */
  { name: "Bloggen", href: "/produktbloggen" },
];

function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.skiplink} href="#hovedinnhold">
        Hopp til innhold
      </a>
      <div className={styles.headerContainer}>
        <Link
          href="/"
          passHref
          data-umami-event="navigere"
          data-umami-event-kilde="header"
          className={styles.headerLogoLink}
        >
          <AkselLogo className={styles.headerLogo} />
          <span className="sr-only">Aksel</span>
        </Link>

        <Spacer />
        <Show above="lg" asChild>
          <Box
            as="nav"
            paddingInline={{ xs: "0 space-8", lg: "0 space-32" }}
            aria-label="Hovedmeny"
          >
            <HStack as="ul" gap="space-8" align="center">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <HeaderLink name={link.name} href={link.href} />
                </li>
              ))}
            </HStack>
          </Box>
        </Show>
        <HStack align="center" gap="2">
          <GlobalSearch />
          {/* <Hamburger /> */}
        </HStack>
      </div>
    </header>
  );
}

export { Header };
