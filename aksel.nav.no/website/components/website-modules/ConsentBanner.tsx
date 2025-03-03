"use client";

import getConfig from "next/config";
import NextLink from "next/link";
import Script from "next/script";
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
import { classifyTraffic } from "../utils/get-current-environment";
import useConsent from "./useConsent";

export const ConsentBanner = ({
  defaultShow = false,
  hide = false,
}: {
  defaultShow?: boolean;
  hide?: boolean;
}) => {
  const [umamiTag, setUmamiTag] = useState<string | undefined>();
  const [clientAcceptsTracking, setClientAcceptsTracking] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(defaultShow);
  const { consent, updateConsent } = useConsent();
  const trackingId = getConfig().publicRuntimeConfig.UMAMI_TRACKING_ID;

  useEffect(() => {
    let showConsent = true;
    if (["accepted", "rejected"].includes(consent)) {
      showConsent = false;
    }
    setShowConsentBanner(showConsent);

    setUmamiTag(classifyTraffic());
    setClientAcceptsTracking(consent === "accepted");
  }, [consent]);

  return (
    <div className="relative z-10 bg-[#ECEDEF]">
      {umamiTag && (
        <Script
          defer
          src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
          data-host-url="https://umami.nav.no"
          data-website-id={trackingId}
          data-auto-track={clientAcceptsTracking}
          data-tag={umamiTag}
        ></Script>
      )}

      {!hide && showConsentBanner && (
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
                  setShowConsentBanner(false);
                }}
              >
                Bare nødvendige
              </Button>
              <Button
                className="h-fit min-w-fit"
                type="button"
                onClick={() => {
                  updateConsent("accepted");
                  setShowConsentBanner(false);
                  // NOTE: umami _should_ exist on window object here (loaded via <Script>)
                  // we call track manually this _one_ time to ensure the current page is
                  // accounted for, any new page loads will be captured by data-auto-track
                  // https://umami.is/docs/tracker-configuration
                  umami.track();
                }}
              >
                Godkjenn alle
              </Button>
            </HStack>
          </Stack>
        </Page.Block>
      )}
    </div>
  );
};
