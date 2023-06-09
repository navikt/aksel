import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyLong } from "..";

export interface LinkPanelDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkPanelDescription = forwardRef<
  HTMLDivElement,
  LinkPanelDescriptionProps
>(({ className, ...rest }, ref) => (
  <BodyLong
    {...rest}
    as="div"
    ref={ref}
    className={cl("navds-link-panel__description", className)}
  />
));
