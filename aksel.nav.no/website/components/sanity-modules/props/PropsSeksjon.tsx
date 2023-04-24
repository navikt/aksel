import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import PropTableV2 from "./PropTabell";
import { PropTableT } from "@/types";

const PropsSeksjon = ({ node }: { node: any }) => {
  if (
    !node ||
    (node?.elementer?.length === 0 && node?.komponenter?.length === 0)
  ) {
    return null;
  }

  return (
    <div className="mb-16">
      {node?.komponenter?.length > 0 && (
        <>
          {node.komponenter.map((prop) => (
            <PropTableV2
              komponent={prop as unknown as PropTableT}
              key={prop?._key}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(PropsSeksjon, "PropsSeksjon");
