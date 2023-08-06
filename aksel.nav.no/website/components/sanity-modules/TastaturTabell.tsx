import { withErrorBoundary } from "@/error-boundary";
import { UUTableT } from "@/types";
import { KBD } from "components/website-modules/KBD";

import { AkselTable, AkselTableRow } from "components/website-modules/Table";
import React from "react";

const UuSeksjon = ({ node }: { node: UUTableT }) => {
  if (!node || !node?.tastatur) {
    return null;
  }

  const getKey = (s: string) => (
    <span className="my-1 flex w-full flex-wrap gap-x-1 gap-y-2">
      {s
        .trim()
        .split(" ")
        .map((x, i, arr) => (
          <React.Fragment key={x}>
            <KBD>{x}</KBD>
            {i !== arr.length - 1 && <span>+</span>}
          </React.Fragment>
        ))}
    </span>
  );

  return (
    <AkselTable th={[{ text: "Kommando" }, { text: "Interaksjon" }]}>
      {node.tastatur.map((x) => (
        <AkselTableRow
          key={x._key}
          tr={[{ text: getKey(x.key) }, { text: x.action }]}
        />
      ))}
    </AkselTable>
  );
};

export default withErrorBoundary(UuSeksjon, "UuSeksjon");
