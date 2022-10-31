import React, { forwardRef } from "react";

export interface ZoomButtonProps {
  /**
   * Button text
   */
  label: string;
}

export type ZoomButtonType = React.ForwardRefExoticComponent<
  ZoomButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export const ZoomButton = forwardRef<HTMLButtonElement, ZoomButtonProps>(
  ({ label, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest} className="navdsi-timeline__zoom">
        {label}
      </button>
    );
  }
);

//@ts-ignore
ZoomButton.componentType = "zoom";

export default ZoomButton;
