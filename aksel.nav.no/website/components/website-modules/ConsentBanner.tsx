"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import {
  BodyLong,
  Button,
  HStack,
  Heading,
  Link,
  Page,
  Stack,
} from "@navikt/ds-react";
import { useCookies } from "./CookieProvider";

export const ConsentBanner = ({
  defaultShow = false,
  hide = false,
}: {
  defaultShow?: boolean;
  hide?: boolean;
}) => {
  const [showBanner, setShowBanner] = useState(defaultShow);
  const { consent, updateConsent } = useCookies();

  useEffect(() => {
    setShowBanner(!["accepted", "rejected"].includes(consent));
  }, [consent]);

  if (hide || !showBanner) {
    return null;
  }

  return (
    <div className="relative z-10 bg-[#ECEDEF]">
      <Page.Block width="2xl" aria-labelledby="cookie_heading" as="section">
        <Stack
          gap={{ xs: "4", lg: "8" }}
          wrap={false}
          className="px-6 py-10"
          align={{ xs: "start", lg: "center" }}
          direction={{ xs: "column", lg: "row" }}
        >
          <div>
            <Heading id="cookie_heading" size="small" level="2">
              Vi bruker cookies
            </Heading>
            <BodyLong className="mb-2">
              Nødvendige informasjonskapsler sørger for at nettstedet fungerer
              og er sikkert, og kan ikke velges bort. Andre brukes til
              statistikk og analyse. Godkjenner du alle, hjelper du oss å lage
              bedre nettsider og tjenester.{" "}
              <Link as={NextLink} href="/personvernerklaering">
                Mer om våre informasjonskapsler.
              </Link>
            </BodyLong>
          </div>

          <HStack
            gap="2"
            align={{ xs: "start", lg: "center" }}
            className="min-w-fit"
          >
            <Button
              className="h-fit min-w-fit"
              type="button"
              onClick={() => {
                updateConsent("rejected");
                setShowBanner(false);
              }}
            >
              Bare nødvendige
            </Button>
            <Button
              className="h-fit min-w-fit"
              type="button"
              onClick={() => {
                updateConsent("accepted");
                setShowBanner(false);
                // NOTE: umami _should_ exist on window object here (loaded via <Script>)
                // we call track manually this _one_ time to ensure the current page is
                // accounted for, any new page loads will be captured by data-auto-track
                // https://umami.is/docs/tracker-configuration
                // umami.track();
              }}
            >
              Godkjenn alle
            </Button>
          </HStack>
        </Stack>
      </Page.Block>
    </div>
  );
};
