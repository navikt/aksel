import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong } from "../typography";

export interface LinkPanelDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkPanelDescription = forwardRef<
  HTMLDivElement,
  LinkPanelDescriptionProps
>(({ className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <BodyLong
      {...rest}
      as="div"
      ref={ref}
      className={cn("navds-link-panel__description", className)}
    />
  );
});

export default LinkPanelDescription;
