"use client";

import { omit, useClientLayoutEffect } from "@navikt/ds-react/Utils";

export const ClientComponent = () => {
  console.log({ omit: omit({ test: "value" }, ["test"]) });
  useClientLayoutEffect(() => {
    console.log("mounted in client-component");
  }, []);

  return <div>client</div>;
};
