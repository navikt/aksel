import React, { forwardRef } from "react";

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(() => (
  <div>test</div>
));

export default StepIndicator;
