import React from "react";
import {
  DismissableDescendantsProvider,
  useDismissableDescendants,
} from "../DismissableLayer.context";

/**
 * `DismissableRoot´ is only needed to initialize the `Descendants` API for the root layer.
 */
const DismissableRoot = ({ children }: { children: React.ReactNode }) => {
  const descendants = useDismissableDescendants();

  return (
    <DismissableDescendantsProvider value={descendants}>
      {children}
    </DismissableDescendantsProvider>
  );
};

export default DismissableRoot;
