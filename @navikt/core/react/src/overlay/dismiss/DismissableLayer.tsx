import React, { forwardRef } from "react";
import { useDescendantsContext } from "./DismissableLayer.context";
import { DismissableLayerProps } from "./DismissableLayer.types";
import DismissableLayerNode from "./parts/DismissableLayerNode";
import DismissableRoot from "./parts/DismissableLayerRoot";

const DismissableLayer = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (props: DismissableLayerProps, ref) => {
    const context = useDescendantsContext();

    /**
     * To correctly handle nested DismissableLayer,
     * we make sure to only initialize `Descendants` API for the root layer.
     */
    return context ? (
      <DismissableLayerNode {...props} ref={ref} />
    ) : (
      <DismissableRoot>
        <DismissableLayerNode {...props} ref={ref} />
      </DismissableRoot>
    );
  },
);

export default DismissableLayer;
