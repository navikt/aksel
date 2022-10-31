import { AmplitudeEvents, logAmplitudeEvent } from "@/components";
import { Heading } from "@navikt/ds-react";
import AkselLogo from "components/assets/AkselLogo";
import React, { useEffect } from "react";

function Page() {
  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.error, {
      side: window.location.pathname,
    });
  }, []);

  return (
    <div
      id="vk-notFoundId"
      className="flex h-screen w-screen items-center justify-center gap-8"
    >
      <AkselLogo width="10rem" height="10rem" />
      <div>
        <Heading spacing level="1" size="large">
          Det oppstod en feil ved lasting av side. Prøv å laste side på nytt.
        </Heading>
      </div>
    </div>
  );
}

export default Page;
