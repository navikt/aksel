"use client";

import { BoxNew } from "@navikt/ds-react";
import Latest from "../../../components/sanity-modules/frontpage-blocks/latest-articles/Latest";

export const FrontpageLatest = ({ latest }) => {
  return (
    <BoxNew paddingInline={{ xs: "2", lg: "18" }}>
      {latest.map((x) => {
        switch (x._type) {
          case "nytt_fra_aksel":
            return <Latest block={x} key={x._key} />;
          default:
            return null;
        }
      })}
    </BoxNew>
  );
};
