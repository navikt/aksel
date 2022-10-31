import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import PropTableV2, { PropT } from "./PropTabell";

const PropsSeksjon = ({ node }: { node: any }): JSX.Element => {
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
              komponent={prop as unknown as PropT}
              key={prop?._key}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(PropsSeksjon, "PropsSeksjon");
