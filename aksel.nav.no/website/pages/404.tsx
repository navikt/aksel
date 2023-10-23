import { AmplitudeEvents, amplitude } from "@/logging";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { AkselCubeStatic } from "components/website-modules/cube";
import NextLink from "next/link";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    amplitude.track(AmplitudeEvents.notfound, {
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
          404 - Fant ikke siden
        </Heading>
        <BodyLong className="mb-2">
          Vi fant ikke siden du var ute etter{" "}
        </BodyLong>
        <NextLink href="/" passHref legacyBehavior>
          <Link>Tilbake til forsiden</Link>
        </NextLink>
      </div>
    </div>
  );
}

export default Page;
