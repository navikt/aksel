import React from "react";
import {
  DescendantsProvider,
  useDescendants,
} from "../DismissableLayer.context";

const DismissableRoot = ({ children }: { children: React.ReactNode }) => {
  const descendants = useDescendants();

  return (
    <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
  );
};

export default DismissableRoot;
