"use client";

import { useEffect, useRef } from "react";
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
  useEffect(() => {
    const consentAnswer = getStorageAcceptedTracking();
    if (consentAnswer === "undecided") {
      ref.current?.showModal();
    }
  }, []);

  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
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
