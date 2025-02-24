"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Cookies } from "typescript-cookie";
import {
  BodyLong,
  Button,
  HStack,
  Heading,
  Page,
  Stack,
} from "@navikt/ds-react";
import { classifyTraffic } from "../utils/get-current-environment";

const CONSENT_TRACKER_ID = "aksel-consent";

type CONSENT_TRACKER_STATE =
  | "undecided"
  | "accepted"
  | "rejected"
  | "no_action";

type CookieData = {
  createdAt: string;
  updatedAt: string;
  version: number;
  consents: {
    tracking?: CONSENT_TRACKER_STATE;
  };
};

export const getStorageAcceptedTracking = () => {
  const rawState = Cookies.get(CONSENT_TRACKER_ID) as string;

  if (!rawState) {
    return "undecided";
  }

  const cookieData = JSON.parse(rawState) as CookieData;

  return cookieData.consents.tracking as CONSENT_TRACKER_STATE;
};

export const setStorageAcceptedTracking = (state: CONSENT_TRACKER_STATE) => {
  const cookieData: CookieData = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    consents: {},
  };

  cookieData.consents.tracking = state;

  const cookieJson = JSON.stringify(cookieData);

  Cookies.set(CONSENT_TRACKER_ID, cookieJson, {
    expires: 365,
    domain: "aksel.ansatt.dev.nav.no",
  });
};

export const ConsentBanner = () => {
  const [umamiTag, setUmamiTag] = useState<string | undefined>();
  const [clientAcceptsTracking, setClientAcceptsTracking] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);

  useEffect(() => {
    const consentAnswer = getStorageAcceptedTracking();

    const disabledModalParam = new URLSearchParams(window.location.search).get(
      "no_consent_modal",
    );
    if (consentAnswer === "undecided" && !disabledModalParam) {
      setShowConsentBanner(true);
    }

    setUmamiTag(classifyTraffic());
    setClientAcceptsTracking(getStorageAcceptedTracking() === "accepted");
  }, []);

  return (
    <div className="relative z-10 bg-gray-200">
      {umamiTag && (
        <Script
          defer
          src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
          data-host-url="https://umami.nav.no"
          data-website-id="7b9fb2cd-40f4-4a30-b208-5b4dba026b57"
          data-auto-track={clientAcceptsTracking}
          data-tag={umamiTag}
        ></Script>
      )}

      {showConsentBanner && (
        <Page.Block width="2xl" aria-labelledby="cookie_heading" as="section">
          <Stack
            gap={{ xs: "4", lg: "8" }}
            wrap={false}
            className="px-6 py-10"
            align={{ xs: "start", lg: "center" }}
            direction={{ xs: "column", lg: "row" }}
          >
            <div>
              <Heading size="small" level="2">
                Vi bruker cookies
              </Heading>
              <BodyLong className="mb-2">
                Nødvendige informasjonskapsler sørger for at nettstedet fungerer
                og er sikkert, og kan ikke velges bort. Andre brukes til
                statistikk og analyse. Godkjenner du alle, hjelper du oss å lage
                bedre nettsider og tjenester.{" "}
                <Link href="/side/personvernerklaering">
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
                  setStorageAcceptedTracking("rejected");
                }}
              >
                Bare nødvendige
              </Button>
              <Button
                className="h-fit min-w-fit"
                type="button"
                onClick={() => {
                  setStorageAcceptedTracking("accepted");
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
