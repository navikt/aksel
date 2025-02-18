"use client";

import { useLayoutEffect, useRef } from "react";
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
  useLayoutEffect(() => {
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
