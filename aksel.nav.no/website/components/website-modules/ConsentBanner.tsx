"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Cookies } from "typescript-cookie";
import { FaceLaughIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Button,
  Detail,
  HStack,
  Link,
  Modal,
} from "@navikt/ds-react";

const CONSENT_TRACKER_ID = "acceptTracking";

type CONSENT_TRACKER_STATE = "undecided" | "accepted" | "rejected";

export const getStorageAcceptedTracking = () => {
  const rawState = Cookies.get(CONSENT_TRACKER_ID);
  if (!rawState) {
    return "undecided";
  }

  return rawState as CONSENT_TRACKER_STATE;
};

export const setStorageAcceptedTracking = (state: CONSENT_TRACKER_STATE) => {
  Cookies.set(CONSENT_TRACKER_ID, state, { expires: 365 });
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
        header={{ heading: "Tørt, sprøtt bakverk, laget uten hevemiddel" }}
      >
        <Modal.Body>
          <HStack className="mb-10" justify="center">
            <FaceLaughIcon fontSize="10rem" />
          </HStack>
          <BodyLong className="mb-2">
            Er det greit at vi logger litt brukeradferd under domenet
            aksel.nav.no?
          </BodyLong>
          <BodyLong className="mb-2">
            Vi bruker{" "}
            <Link href="https://aksel.nav.no/god-praksis/artikler/male-brukeradferd-med-umami">
              Umami
            </Link>
            , og dataene lagres på NAV sin sky i Google Cloud Platform.
          </BodyLong>
          <BodyLong className="mb-4">
            Et par cookies blir lagret på nettleseren din uansett for at Aksel
            nettsiden skal virke, og slik at vi ikke glemmer det valget du tar
            akkurat nå!
          </BodyLong>

          <Detail>
            Trykker du vekk denne modalen vil du få den på nytt ved neste
            sidelasting, og vi logger da ikke brukeradferd.
          </Detail>
          <Detail>
            Trykker du &quot;Nei&quot; vil vi <em>ikke </em>logge brukeradferd.
          </Detail>
          <Detail>
            Trykker du &quot;Ja&quot; logger vi (helst ikke personlig
            identifiserbar) brukeradferd under aksel.nav.no domenet.
          </Detail>
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
            Ja
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setStorageAcceptedTracking("rejected");
              ref.current?.close();
            }}
          >
            Nei
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
