"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Cookies } from "typescript-cookie";
import { BodyLong, Button, Link, Modal } from "@navikt/ds-react";

const CONSENT_TRACKER_ID = "aksel-consent";

type CONSENT_TRACKER_STATE = "undecided" | "accepted" | "rejected";

type CookieData = {
  createdAt: string;
  updatedAt: string;
  version: number;
  consents: {
    tracking?: string;
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

  Cookies.set(CONSENT_TRACKER_ID, JSON.stringify(cookieData), { expires: 365 });
};

export const ConsentBanner = () => {
  const refUmamiTag = useRef<string>("");

  useEffect(() => {
    const consentAnswer = getStorageAcceptedTracking();
    if (consentAnswer === "undecided") {
      ref.current?.showModal();
    }

    const isProdUrl = () => window.location.host === "aksel.nav.no";
    const isPreview = () => !!document.getElementById("exit-preview-id");

    refUmamiTag.current = isPreview()
      ? "preview"
      : isProdUrl()
        ? "production"
        : "development";

    setClientAcceptsTracking(getStorageAcceptedTracking() === "accepted");
  }, []);

  const ref = useRef<HTMLDialogElement>(null);

  const [clientAcceptsTracking, setClientAcceptsTracking] = useState(false);

  return (
    <div>
      {refUmamiTag.current && (
        <Script
          defer
          src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
          data-host-url="https://umami.nav.no"
          data-website-id="7b9fb2cd-40f4-4a30-b208-5b4dba026b57"
          data-auto-track={clientAcceptsTracking ? "true" : "false"}
          data-tag={refUmamiTag.current}
        ></Script>
      )}
      <Modal
        ref={ref}
        header={{ heading: "Velg hvilke informasjonskapsler Aksel får bruke" }}
      >
        <Modal.Body>
          <BodyLong className="mb-2">
            Nødvendige informasjonskapsler sørger for at nettstedet fungerer og
            er sikkert, og kan ikke velges bort. Andre brukes til statistikk og
            analyse. Godkjenner du alle, hjelper du oss å lage bedre nettsider
            og tjenester.{" "}
            <Link href="https://www.nav.no/informasjonskapsler">
              Mer om våre informasjonskapsler.
            </Link>
          </BodyLong>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            onClick={() => {
              setStorageAcceptedTracking("accepted");
              // NOTE: umami _should_ exist on window object here (loaded via <Head>)
              // we call track manually this _one_ time to ensure the current page is
              // accounted for, any new page loads will be captured by data-auto-track
              // https://umami.is/docs/tracker-configuration
              umami.track();
              ref.current?.close();
            }}
          >
            Godkjenn alle
          </Button>
          <Button
            type="button"
            onClick={() => {
              setStorageAcceptedTracking("rejected");
              ref.current?.close();
            }}
          >
            Bare nødvendige
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
