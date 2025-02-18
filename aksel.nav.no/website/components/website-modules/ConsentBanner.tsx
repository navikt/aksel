"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";

const CONSENT_TRACKER_ID = "acceptTracking";

type CONSENT_TRACKER_STATE = "undecided" | "accepted" | "rejected";

export const getStorageAcceptedTracking = () => {
  const rawState = localStorage.getItem(CONSENT_TRACKER_ID);
  if (rawState === null) {
    return "undecided";
  }

  return rawState as CONSENT_TRACKER_STATE;
};

export const setStorageAcceptedTracking = (state: CONSENT_TRACKER_STATE) => {
  return localStorage.setItem(CONSENT_TRACKER_ID, state);
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
        <Head>
          <script
            defer
            src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
            data-host-url="https://umami.nav.no"
            data-website-id="7b9fb2cd-40f4-4a30-b208-5b4dba026b57"
            data-auto-track={clientAcceptsTracking ? "true" : "false"}
            data-tag={refUmamiTag.current}
          ></script>
        </Head>
      )}
      <Modal ref={ref} header={{ heading: "Overskrift" }}>
        <Modal.Body>
          <BodyLong>Legg til cookie tekst her!</BodyLong>
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
            Aksepter
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setStorageAcceptedTracking("rejected");
              ref.current?.close();
            }}
          >
            Avstå
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
