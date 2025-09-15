import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

/* ------------------------------ Overlay Root ------------------------------ */
interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * ..
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/TODO)
 * @see 🏷️ {@link OverlayProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TOOD: Root state and context provider for overlay components
 * - Manages open/close state
 * - Provides context to children
 */
const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

/* ----------------------------- Overlay Trigger ---------------------------- */
interface OverlayTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayTriggerProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO:
 * - Button that triggers the overlay to open
 * - Can be any element, but should probably be a button for accessibility
 * - Should get back focus on close if `dialog` is used for overlay
 */
const OverlayTrigger = forwardRef<HTMLButtonElement, OverlayTriggerProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <button {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </button>
    );
  },
);

/* ----------------------------- Overlay Portal ---------------------------- */
interface OverlayPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayPortalProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Renders overlay in a portal (at the end of the DOM), and acts as a wrapper
 * - Needs to use Provider context for Portal-node to attach to
 */
const OverlayPortal = forwardRef<HTMLDivElement, OverlayPortalProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

/* ----------------------------- Overlay Backdrop ---------------------------- */
type OverlayBackdropProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

/**
 * @see 🏷️ {@link OverlayBackdropProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Semi-transparent backdrop that covers the screen behind the overlay
 * - Closes overlay on click?
 * - Opt in? Can this be a prop on "Portal", where you can set backdrop=true/false? If false, you can use this to override backdrop then.
 */
const OverlayBackdrop = forwardRef<HTMLDivElement, OverlayBackdropProps>(
  ({ className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return <div {...restProps} ref={forwardedRef} className={cn(className)} />;
  },
);

/* ----------------------------- Overlay Drawer ---------------------------- */
interface OverlayDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayDrawerProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Drawer that slides in from the side
 * - Implemented as `dialog`-element
 */
const OverlayDrawer = forwardRef<HTMLDivElement, OverlayDrawerProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

/* ----------------------------- Overlay Close ---------------------------- */
interface OverlayCloseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link OverlayCloseProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Closes overlay on click.
 * - Closebutton
 * - Acts as trigger, but for close
 */
const OverlayClose = forwardRef<HTMLDivElement, OverlayCloseProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div {...restProps} ref={forwardedRef} className={cn(className)}>
        {children}
      </div>
    );
  },
);

export {
  Overlay,
  OverlayTrigger,
  OverlayPortal,
  OverlayBackdrop,
  OverlayDrawer,
  OverlayClose,
};

export type {
  OverlayProps,
  OverlayTriggerProps,
  OverlayPortalProps,
  OverlayBackdropProps,
  OverlayDrawerProps,
  OverlayCloseProps,
};
