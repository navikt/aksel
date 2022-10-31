import { Heading } from "@navikt/ds-react";
import AkselLogo from "components/assets/AkselLogo";
import React from "react";

/* eslint-disable react/prop-types */
const MyError = ({ statusCode }) => {
  return (
    <div
      id="vk-notFoundId"
      className="flex h-screen w-screen items-center justify-center gap-8"
    >
      <AkselLogo width="10rem" height="10rem" />
      <div>
        <Heading spacing level="1" size="large">
          {statusCode} - En feil oppstod
        </Heading>
      </div>
    </div>
  );
};

export default MyError;
