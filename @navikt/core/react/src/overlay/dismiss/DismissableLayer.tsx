import React from "react";
import { useDismissableDescendantsContext } from "./DismissableLayer.context";
import { DismissableLayerProps } from "./DismissableLayer.types";
import DismissableLayerNode from "./parts/DismissableLayerNode";
import DismissableRoot from "./parts/DismissableLayerRoot";

const DismissableLayer: React.FC<DismissableLayerProps> = (
  props: DismissableLayerProps,
) => {
  const context = useDismissableDescendantsContext();

  /**
   * To correctly handle nested DismissableLayer,
   * we only initialize the `Descendants`-API for the root layer to aboid resetting context
   */
  return context ? (
    <DismissableLayerNode {...props} />
  ) : (
    <DismissableRoot>
      <DismissableLayerNode {...props} />
    </DismissableRoot>
  );
};

export default DismissableLayer;
