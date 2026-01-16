import React, { forwardRef } from "react";
import { BodyLong } from "../typography";
import { cl } from "../util/className";

export interface LinkPanelDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkPanelDescription = forwardRef<
  HTMLDivElement,
  LinkPanelDescriptionProps
>(({ className, ...rest }, ref) => {
  return (
    <BodyLong
      {...rest}
      as="div"
      ref={ref}
      className={cl("aksel-link-panel__description", className)}
    />
  );
});

export default LinkPanelDescription;
