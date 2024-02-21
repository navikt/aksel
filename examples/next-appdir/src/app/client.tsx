"use client";

import { omit, useClientLayoutEffect } from "@navikt/ds-react/Utils";

export const ClientComponent = () => {
  console.log(omit({ test: "value" }, ["123"]));
  useClientLayoutEffect(() => {
    console.log("mounted");
  }, []);
  return <div>client</div>;
};
