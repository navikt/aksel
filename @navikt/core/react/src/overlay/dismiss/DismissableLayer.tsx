import React, { forwardRef } from "react";
import { useDescendantsContext } from "./DismissableLayer.context";
import { DismissableLayerProps } from "./DismissableLayer.types";
import DismissableLayerNode from "./parts/DismissableLayerNode";
import DismissableRoot from "./parts/DismissableLayerRoot";

const DismissableLayer = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (props, ref) => {
    const context = useDescendantsContext();

    return context ? (
      <DismissableLayerNode ref={ref} {...props} />
    ) : (
      <DismissableRoot>
        <DismissableLayerNode ref={ref} {...props} />
      </DismissableRoot>
    );
  },
);

export default DismissableLayer;
