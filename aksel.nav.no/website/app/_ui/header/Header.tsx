"use server";

import Link from "next/link";

/* import { usePathname } from "next/navigation"; */
import { Box, HStack, Show, Spacer } from "@navikt/ds-react";

/* @ts-expect-error "exports"-field not picked up by workspace */
import { PageBlock } from "@navikt/ds-react/Page";
import AkselLogo from "@/assets/Logo";
import { HeaderLink } from "./Header.link";
import styles from "./Header.module.css";

const LINKS = [
  { name: "God praksis", href: "/god-praksis" },
  { name: "Grunnleggende", href: "/grunnleggende" },
  { name: "Ikoner", href: "/ikoner" },
  { name: "Komponenter", href: "/komponenter" },
  { name: "Mønster & Maler", href: "/monster-maler" },
  { name: "Bloggen", href: "/produktbloggen" },
];

function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.skiplink} href="#hovedinnhold">
        Hopp til innhold
      </a>
      <HStack
        asChild
        align="center"
        paddingInline={{ xs: "0 space-16", lg: "0 space-24" }}
        className={styles.headerContainer}
      >
        <PageBlock width="2xl">
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
                    <HeaderLink
                      name={link.name}
                      href={link.href}
                      prefetch={false}
                    />
                  </li>
                ))}
              </HStack>
            </Box>
          </Show>
          {/* <HStack align="center" gap="2">
        <GlobalSearch />
        <Hamburger />
      </HStack> */}
        </PageBlock>
      </HStack>
    </header>
  );
}

export { Header };
