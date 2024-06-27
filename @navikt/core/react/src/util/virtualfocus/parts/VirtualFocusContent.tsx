import React, { forwardRef } from "react";
import { useVirtualFocusInternalContext } from "../VirtualFocus";

export interface VirtualFocusContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const VirtualFocusContent = forwardRef<
  HTMLDivElement,
  VirtualFocusContentProps
>(({ children, ...rest }, ref) => {
  const { uniqueId } = useVirtualFocusInternalContext();
  return (
    <div ref={ref} {...rest} id={`virtualfocus-${uniqueId}-content`}>
      {children}
    </div>
  );
});
