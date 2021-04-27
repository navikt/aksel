import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
} from "react";
import cl from "classnames";

export interface PopoverBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Open state for popover
   */
  open: boolean;
  /**
   * Callback for when popover closes
   */
  onClose: () => void;
  /**
   * Content rendered inside popover
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Custom position based on x, y cordinates
   */
  position?: { x?: number; y?: number };
}

const useEventLister = (event: string, callback) =>
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback);
    };
  }, [event, callback]);

const PopoverBase = forwardRef<HTMLDivElement, PopoverBaseProps>(
  (
    { className, children, open, onClose, position = { x: 0, y: 0 }, ...rest },
    ref
  ) => {
    const close = useCallback(() => open && onClose(), [open, onClose]);

    useEventLister(
      "keydown",
      useCallback((e: KeyboardEvent) => e.key === "Escape" && close(), [close])
    );

    const newPosition = { x: 0, y: 0, ...position };
    return (
      <div
        ref={ref}
        className={cl("navds-popover", className, {
          "navds-popover--hidden": !open,
        })}
        aria-live="polite"
        aria-hidden={!open}
        tabIndex={-1}
        style={{
          transform: `translate3d(${newPosition.x}px, ${newPosition.y}px, 0px)`,
          position: "relative",
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default PopoverBase;
