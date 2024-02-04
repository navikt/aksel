import React from "react";
import { useDescendantsContext } from "./DismissableLayer.context";
import { DismissableLayerProps } from "./DismissableLayer.types";
import DismissableLayerNode from "./parts/DismissableLayerNode";
import DismissableRoot from "./parts/DismissableLayerRoot";

const DismissableLayer: React.FC<DismissableLayerProps> = (
  props: DismissableLayerProps,
) => {
  const context = useDescendantsContext();

  return context ? (
    <DismissableLayerNode {...props} />
  ) : (
    <DismissableRoot>
      <DismissableLayerNode {...props} />
    </DismissableRoot>
  );
};

export default DismissableLayer;
