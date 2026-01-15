"use client";

import NextLink from "next/link";
import { useTransition } from "react";
import { BodyLong, Box, Button, Heading, Link, Stack } from "@navikt/ds-react";
import { useCookieConsent } from "@/app/_ui/cookie-consent/CookieConsent.Provider";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";
import styles from "./ConsentBanner.module.css";

function ConsentBanner() {
  const [isPending, startTransition] = useTransition();

  const context = useCookieConsent();

  if (isPending || !context.consentState.loaded) {
    return null;
  }

  if (!context.showCookieBanner) {
    return null;
  }

  return (
    <div className={styles.consentBannerRoot}>
      <section
        aria-labelledby="cookie_heading"
        className={styles.consentBannerSection}
      >
        <Stack
          as="div"
          gap={{ xs: "space-16", lg: "space-32" }}
          wrap={false}
          align={{ xs: "start", lg: "center" }}
          direction={{ xs: "column", lg: "row" }}
        >
          <div>
            <Heading
              id="cookie_heading"
              size="medium"
              level="2"
              spacing
              className={styles.consentBannerBrandedText}
            >
              Informasjonskapsler på aksel.nav.no
            </Heading>
            <BodyLong>
              Uansett valg deler vi aldri dine data med andre.{" "}
              <Link as={NextLink} href="/personvernerklaering">
                Mer om informasjonskapsler på aksel.nav.no
              </Link>
            </BodyLong>
            <Box marginBlock="space-8">
              <WebsiteList as="ul">
                <WebsiteListItem icon>
                  <strong className={styles.consentBannerBrandedText}>
                    Godta alle:
                  </strong>{" "}
                  Hjelper oss gjøre tjenestene bedre for deg basert på
                  anonymisert bruk.
                </WebsiteListItem>
                <WebsiteListItem icon>
                  <strong className={styles.consentBannerBrandedText}>
                    Bare nødvendige:
                  </strong>{" "}
                  Sikrer at tjenesten fungerer og er trygg. Kan ikke velges
                  bort.
                </WebsiteListItem>
              </WebsiteList>
            </Box>
          </div>

          <Stack
            gap="space-8"
            align="start"
            minWidth="fit-content"
            direction={{ xs: "row", lg: "column" }}
          >
            <Button
              type="button"
              variant="secondary-neutral"
              onClick={() => {
                startTransition(() => {
                  context.rejectCookiesAction();
                });
              }}
            >
              Bare nødvendige
            </Button>
            <Button
              type="button"
              variant="secondary-neutral"
              onClick={() => {
                startTransition(() => {
                  context.acceptCookiesAction();
                });
              }}
            >
              Godkjenn alle
            </Button>
          </Stack>
        </Stack>
      </section>
    </div>
  );
}

export { ConsentBanner };
