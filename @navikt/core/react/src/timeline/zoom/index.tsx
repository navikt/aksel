import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import ZoomButton, { ZoomButtonType } from "./ZoomButton";

interface ZoomProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export interface ZoomType<Props = ZoomProps>
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLUListElement>
  > {
  Button: ZoomButtonType;
  componentType: string;
}

export const Zoom = forwardRef<HTMLUListElement, ZoomProps>(
  ({ className, children, ...rest }, ref) => {
    const { cn } = useRenameCSS();

    return (
      <ul ref={ref} className={cn(className, "navds-timeline__zoom")} {...rest}>
        {children}
      </ul>
    );
  },
) as ZoomType;

Zoom.Button = ZoomButton;
Zoom.componentType = "zoom";

export default Zoom;
