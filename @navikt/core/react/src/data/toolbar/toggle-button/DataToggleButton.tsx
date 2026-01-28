import React from "react";
import { cl, composeEventHandlers } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";

type DataToolbarToggleButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Indicates whether the toggle button is pressed or not.
     * @default false
     */
    isPressed?: boolean;
    /**
     * Default uncontrolled pressed state
     * @default false
     */
    defaultPressed?: boolean;
    /**
     * Callback for new pressed state
     */
    onPressChange?: (isPressed: boolean) => void;
  };

const DataToolbarToggleButton = React.forwardRef<
  HTMLButtonElement,
  DataToolbarToggleButtonProps
>(
  (
    {
      className,
      isPressed,
      defaultPressed = false,
      onPressChange,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = useControllableState({
      defaultValue: defaultPressed,
      value: isPressed,
      onChange: onPressChange,
    });

    return (
      <button
        className={cl("aksel-data-toolbar__toggle-button", className)}
        ref={ref}
        {...props}
        aria-pressed={pressed}
        onClick={composeEventHandlers(onClick, () =>
          setPressed((oldState) => !oldState),
        )}
      />
    );
  },
);

export { DataToolbarToggleButton };
export default DataToolbarToggleButton;
export type { DataToolbarToggleButtonProps };
