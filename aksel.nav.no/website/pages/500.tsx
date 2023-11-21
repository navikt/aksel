import { AmplitudeEvents, amplitude } from "@/logging";
import { AkselCubeStatic } from "@/web/aksel-cube/AkselCube";
import { BodyLong, Heading } from "@navikt/ds-react";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    amplitude.track(AmplitudeEvents.error, {
      side: window.location.pathname,
    });
  }, []);

  return (
    <div
      id="vk-notFoundId"
      className="relative flex h-screen w-screen items-center justify-center gap-8 overflow-hidden"
    >
      <AkselCubeStatic className="text-deepblue-300 opacity-10" />
      <div>
        <Heading spacing level="1" size="large">
          500 - Internal Server Error
        </Heading>
        <BodyLong className="mb-2">
          Det oppstod en feil ved lasting av side. Prøv å laste side på nytt.
        </BodyLong>
      </div>
    </div>
  );
}

export default Page;
