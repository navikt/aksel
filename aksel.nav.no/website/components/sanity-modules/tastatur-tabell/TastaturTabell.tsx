import React from "react";
import ErrorBoundary from "@/error-boundary";
import type { UUTableT } from "@/types";
import KBD from "@/web/KBD";
import { AkselTable, AkselTableRow } from "@/web/Table";

type UUTableProps = { node: UUTableT };

const UuSeksjon = ({ node }: UUTableProps) => {
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

export default function Component(props: UUTableProps) {
  return (
    <ErrorBoundary boundaryName="uu-seksjon">
      <UuSeksjon {...props} />
    </ErrorBoundary>
  );
}
