import React from "react";
import { Button, ButtonProps } from "../../../button";
import { Tooltip } from "../../../tooltip";

type DataToolbarButtonProps = Omit<
  ButtonProps,
  "variant" | "size" | "data-color"
> & {
  /**
   * Kort beskrivelse av knappens funksjon.
   */
  tooltip?: string; // TODO: Bør kanskje ikke være innebygget, men funker ikke å bruke Tooltip rundt Button rundt ActionMenu.Trigger i dag pga. props-forwarding i Tooltip
};

const DataToolbarButton = React.forwardRef<
  HTMLButtonElement,
  DataToolbarButtonProps
>(({ tooltip, ...rest }, ref) => {
  const button = (
    <Button
      ref={ref}
      {...rest}
      variant="secondary"
      size="small"
      data-color="neutral"
      iconPosition="right"
    />
  );
  return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button;
});

export { DataToolbarButton };
export default DataToolbarButton;
export type { DataToolbarButtonProps };
