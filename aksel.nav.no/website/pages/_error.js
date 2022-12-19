import { Heading, BodyLong } from "@navikt/ds-react";
import React from "react";
import { AkselCubeStatic } from "components/website-modules/cube";

/* eslint-disable react/prop-types */
const MyError = ({ statusCode }) => {
  return (
    <div
      id="vk-notFoundId"
      className="relative flex h-screen w-screen items-center justify-center gap-8 overflow-hidden"
    >
      <AkselCubeStatic className="text-deepblue-300 opacity-10" />
      <div>
        <Heading spacing level="1" size="large">
          {statusCode} - Det oppstod en feil!
        </Heading>
        <BodyLong className="mb-2">
          Det oppstod en feil ved lasting av side. Prøv å laste side på nytt.
        </BodyLong>
      </div>
    </div>
  );
};

export default MyError;
