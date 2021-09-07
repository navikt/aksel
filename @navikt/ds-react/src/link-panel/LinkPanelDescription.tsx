import React, { forwardRef } from "react";
import cl from "classnames";

interface LinkPanelDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type LinkPanelDescriptionType = React.ForwardRefExoticComponent<
  LinkPanelDescriptionProps & React.RefAttributes<HTMLDivElement>
>;

export const LinkPanelDescription: LinkPanelDescriptionType = forwardRef(
  ({ className, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-link-panel__description", className)}
    />
  )
);
