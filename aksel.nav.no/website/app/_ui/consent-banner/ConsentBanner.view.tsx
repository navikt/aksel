"use client";

import NextLink from "next/link";
import { useTransition } from "react";
import { BodyLong, Box, Button, Heading, Link, Stack } from "@navikt/ds-react";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";
import styles from "./ConsentBanner.module.css";
import { acceptCookies, rejectCookies } from "./ConsentBanner.utils";

function ConsentBannerView() {
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return null;
  }

  return (
    <div className={styles.consentBannerRoot}>
      <section aria-labelledby="cookie_heading">
        <Stack
          as="div"
          gap={{ xs: "4", lg: "8" }}
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
            gap="2"
            align="start"
            minWidth="fit-content"
            direction={{ xs: "row", lg: "column" }}
          >
            <Button
              type="button"
              variant="secondary-neutral"
              onClick={() => {
                startTransition(() => {
                  rejectCookies();
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
                  acceptCookies();
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

export { ConsentBannerView };
