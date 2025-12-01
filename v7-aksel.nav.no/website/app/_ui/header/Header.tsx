import clsx from "clsx";
import Link from "next/link";
import {
  BodyShort,
  Box,
  Link as DsLink,
  GlobalAlert,
  HStack,
  Hide,
  Show,
  Spacer,
} from "@navikt/ds-react";
import {
  GlobalAlertContent,
  GlobalAlertHeader,
  GlobalAlertTitle,
} from "@navikt/ds-react/GlobalAlert";
import { GlobalSearch } from "@/app/_ui/global-search/GlobalSearch";
import { MobileNav } from "@/app/_ui/mobile-nav/MobileNav";
import { ThemeButton } from "@/app/_ui/theming/Theme.button";
import AkselLogo from "@/assets/Logo";
import { HeaderLink } from "./Header.link";
import styles from "./Header.module.css";

const LINKS = [{ name: "Designsystemet", href: "/designsystemet" }];

function Header({ variant }: { variant?: "default" | "produktbloggen" }) {
  variant = variant ? variant : "default";

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerProduktbloggen]: variant === "produktbloggen",
      })}
    >
      <a className={styles.skiplink} href="#hovedinnhold">
        Hopp til innhold
      </a>
      <GlobalAlert status="announcement">
        <GlobalAlertHeader>
          <GlobalAlertTitle>
            Dette er dokumentasjonen for Aksel versjon 7.
          </GlobalAlertTitle>
        </GlobalAlertHeader>
        <GlobalAlertContent>
          Den nyeste versjonen finner du på{" "}
          <DsLink href="https://aksel.nav.no" variant="neutral">
            aksel.nav.no
          </DsLink>
        </GlobalAlertContent>
      </GlobalAlert>
      <div className={styles.headerContainer}>
        <Link href="/" passHref className={styles.headerLogoLink}>
          <Show above="sm">
            <AkselLogo className={styles.headerLogo} />
          </Show>
          <Hide above="sm">
            <svg
              width="26"
              height="26"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.headerLogo}
              aria-hidden
              focusable="false"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1213 2.05025C12.4341 0.737498 14.2146 0 16.0711 0H41C44.866 0 48 3.13401 48 7V31.9289C48 33.7854 47.2625 35.5659 45.9497 36.8787L45.8787 36.9497L35.4142 47.4142C34.6332 48.1953 33.3668 48.1953 32.5858 47.4142C31.8047 46.6332 31.8047 45.3668 32.5858 44.5858L43.0503 34.1213C44.2218 32.9497 44.2218 31.0503 43.0503 29.8787L18.1213 4.94974C16.9503 3.77876 15.0522 3.77817 13.8804 4.94799L13.8787 4.94975L3.41421 15.4142C2.63316 16.1953 1.36683 16.1953 0.585786 15.4142C-0.0976316 14.7308 -0.183059 13.6758 0.329504 12.8995C0.402728 12.7886 0.488155 12.6834 0.585786 12.5858L11.0503 2.12132L11.0524 2.11913L11.1213 2.05025ZM44 7V25.1716L22.8284 4H41C42.6569 4 44 5.34315 44 7ZM21.9142 28.9142C22.6953 28.1332 22.6953 26.8668 21.9142 26.0858C21.1332 25.3047 19.8668 25.3047 19.0858 26.0858L0.585786 44.5858C-0.195263 45.3668 -0.195263 46.6332 0.585786 47.4142C1.36683 48.1953 2.63316 48.1953 3.41421 47.4142L21.9142 28.9142Z"
                fill="currentColor"
              />
            </svg>
          </Hide>
          <BodyShort visuallyHidden as="span">
            Aksel
          </BodyShort>
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

          <Show below="lg">
            <MobileNav />
          </Show>
          <ThemeButton />
        </HStack>
      </div>
    </header>
  );
}

export { Header };
