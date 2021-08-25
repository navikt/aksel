import React, { forwardRef } from "react";
import cl from "classnames";

interface LinkPanelContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type LinkPanelContentType = React.ForwardRefExoticComponent<
  LinkPanelContentProps & React.RefAttributes<HTMLDivElement>
>;

export const LinkPanelContent: LinkPanelContentType = forwardRef(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-link-panel__content", className)}
      {...rest}
    />
  )
);
