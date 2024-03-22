import React from "react";
import { useDescendantsContext } from "./DismissableLayer.context";
import { DismissableLayerProps } from "./DismissableLayer.types";
import DismissableLayerNode from "./parts/DismissableLayerNode";
import DismissableRoot from "./parts/DismissableLayerRoot";

const DismissableLayer: React.FC<DismissableLayerProps> = (
  props: DismissableLayerProps,
) => {
  const context = useDescendantsContext();

  /**
   * To correctly handle nested DismissableLayer,
   * we make sure to only initialize `Descendants` API for the root layer.
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
