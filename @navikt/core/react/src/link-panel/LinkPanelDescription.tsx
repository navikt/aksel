import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyLong } from "..";

interface LinkPanelDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type LinkPanelDescriptionType = React.ForwardRefExoticComponent<
  LinkPanelDescriptionProps & React.RefAttributes<HTMLDivElement>
>;

export const LinkPanelDescription: LinkPanelDescriptionType = forwardRef(
  ({ className, ...rest }, ref) => (
    <BodyLong
      {...rest}
      as="div"
      ref={ref}
      className={cl("navds-link-panel__description", className)}
    />
  )
);
