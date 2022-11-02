import React, { useEffect } from "react";
import { AmplitudeEvents, logAmplitudeEvent } from "@/components";
import AkselLogo from "components/assets/AkselLogo";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import NextLink from "next/link";

function Page() {
  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.notfound, {
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
          404 - Fant ikke siden
        </Heading>
        <BodyLong className="mb-2">
          Vi fant ikke siden du var ute etter{" "}
        </BodyLong>
        <NextLink href="/" passHref>
          <Link>Tilbake til forsiden</Link>
        </NextLink>
      </div>
    </div>
  );
}

export default Page;
