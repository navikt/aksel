import { Send } from "@navikt/ds-icons";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import React, { useRef, useState } from "react";

const BundleChecker = () => {
  const [inc, setInc] = useState(0);
  const interval = useRef(null);

  const start = () => {
    interval.current = setInterval(() => {
      setInc((x) => x + 0.4);
    }, 10);
  };
  if (inc > 99) {
    clearInterval(interval.current);
    window.location.replace("https://aksel.nav.no/admin");
  }

  document.body.style.opacity = `${100 - inc}%`;
  document.body.style.scale = `${1 - inc / 150}`;
  document.body.style.rotate = `${inc ** 1.3}deg`;

  return (
    <Modal
      aria-labelledby="modal-heading"
      closeButton={false}
      open
      onClose={() => null}
    >
      <Modal.Content style={{ minWidth: "20rem", maxWidth: "40rem" }}>
        <Heading spacing id="modal-heading" size="medium" level="1">
          Studioet er flyttet!
        </Heading>

        <BodyLong spacing>
          Vi har oppdatert studioet og flyttet det til ny url:
          aksel.nav.no/admin. Hvis noe ikke fungerer, ta kontakt på slack
          #aksel-redaksjonen! Husk å logge inn med samme login-provider. For de
          fleste vil dette være NAV SSO.
        </BodyLong>
        <Button
          onClick={() => start()}
          icon={<Send aria-hidden />}
          iconPosition="right"
        >
          Gå til nytt studio
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default BundleChecker;
