import React, { HTMLAttributes, forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

export interface LinkCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  ({ children, className }: LinkCardProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div ref={forwardedRef} className={cn("navds-link-card", className)}>
        {children}
      </div>
    );
  },
);

export default { LinkCard };
