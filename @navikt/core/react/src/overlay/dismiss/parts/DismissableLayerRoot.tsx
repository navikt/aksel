import React from "react";
import {
  DescendantsProvider,
  useDescendants,
} from "../DismissableLayer.context";

/**
 * `DismissableRoot´ is only needed to initialize the `Descendants` API for the root layer.
 */
const DismissableRoot = ({ children }: { children: React.ReactNode }) => {
  const descendants = useDescendants();

  return (
    <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
  );
};

export default DismissableRoot;
