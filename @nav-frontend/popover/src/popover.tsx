import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import cl from "classnames";
import "@nav-frontend/popover-style";
import { keyCodes } from "nav-frontend-js-utils";

export type PopoverOrientation =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

export interface PopoverPosisjonShape {
  left?: number;
  top?: number;
  pilLeft?: number;
}

interface PopoverProps {
  /**
   * Element that popover will anchor to
   */
  anchor: HTMLElement | null;
  /**
   * children
   */
  children: React.ReactNode;
  /**
   * Popover arrow toggle
   * @default true
   */
  arrow?: boolean;
  /**
   * Orientation for popover
   * @default 'auto'
   */
  orientation?: PopoverOrientation;
  /**
   * Offset to anchor
   * @default 16px with arrow, 0px without arrow
   */
  offset?: number;
  /**
   * Callback for when popover requests to close
   */
  onRequestClose: () => void;

  // OLD FROM HERE
  /**
   * Callback når popover åpnes.
   */
  onOpen?: () => void;

  /**
   * Avstand til anker element i pixler. Default er `16px` (`1rem`) med pil, eller `0` uten pil.
   */
  avstandTilAnker?: number;
  /**
   * Bestemmer om Popover automatisk skal få fokus når den vises.
   */
  autoFokus?: boolean;

  /**
   * Egendefinert klassenavn.
   */
  className?: string;
  /**
   * CSS-stiler for absolutt posisjonering av popover vindu og pil. Brukes av Popover for dynamisk
   * justering av posisjon ved resize og scroll.
   */
  posisjon?: PopoverPosisjonShape;
  /**
   * React-referanse til intern `<div>`
   */
  innerRef?: React.RefObject<HTMLDivElement>;
}

const Popover = ({
  anchor,
  children,
  arrow = true,
  orientation = "auto",
  className = "",
  offset,
  onRequestClose,
  ...props
}: PopoverProps) => {
  const firstRun = useRef(true);
  const popperElement = useRef<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(!!anchor);
  const [anchorOffset, setAnchorOffset] = useState<number>(16);

  useEffect(() => {
    !!anchor !== open && setOpen(!open);

    if (open) {
      popperElement.current?.focus();
    }
  }, [anchor, open]);

  useEffect(() => {
    if (offset) {
      setAnchorOffset(offset);
    } else {
      arrow ? setAnchorOffset(16) : setAnchorOffset(0);
    }
  }, [arrow, offset]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      const handleKeys = (e: KeyboardEvent) => {
        console.log(e.key);
        console.log("called");
        if (!open) return;
        if (e.key === "esc") onRequestClose();
        if (e.key === "tab") checkFocus();
      };
      const checkFocus = () => {
        const focusElement = document.activeElement;
        if (
          focusElement === popperElement.current ||
          focusElement === anchor ||
          (popperElement.current?.contains &&
            popperElement.current.contains(focusElement))
        ) {
          return;
        }
        onRequestClose();
      };

      window.addEventListener("keydown", handleKeys);
      return () => {
        window.removeEventListener("keydown", handleKeys);
      };
    }
  }, [anchor, onRequestClose, open]);

  const { styles, attributes } = usePopper(anchor, popperElement.current, {
    placement: orientation,
    modifiers: [
      { name: "arrow", options: { element: arrowElement.current } },
      {
        name: "offset",
        options: {
          offset: [0, anchorOffset],
        },
      },
    ],
  });

  return (
    <>
      <div
        className={cl("popover", className, { popover__hidden: !open })}
        onClick={(e) => e.stopPropagation()}
        ref={popperElement}
        style={styles.popper}
        tabIndex={0}
        {...attributes.popper}
      >
        <div className="popover__content-inner">{children}</div>
        {arrow && (
          <div
            ref={arrowElement}
            style={styles.arrow}
            className="popover__arrow"
          />
        )}
      </div>
    </>
  );
};

export default Popover;
