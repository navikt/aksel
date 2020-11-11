import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

import "@nav-frontend/popover-style";
export enum PopoverOrientering {
  Over = "over",
  OverVenstre = "over-venstre",
  OverHoyre = "over-hoyre",
  Under = "under",
  UnderVenstre = "under-venstre",
  UnderHoyre = "under-hoyre",
  Venstre = "venstre",
  Hoyre = "hoyre",
}
export interface PopoverPosisjonShape {
  left?: number;
  top?: number;
  pilLeft?: number;
}

interface PopoverProps {
  /**
   * Element that popover will anchor to
   */
  anchor: HTMLElement;
  /**
   * children
   */
  children: React.ReactNode;
  /**
   * Callback når popover åpnes.
   */
  onOpen?: () => void;
  /**
   * Callback når popover ber om å lukkes.
   */
  onRequestClose?: () => void;
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
   * Orientering i forhold til anker. Bestemmer hvordan pilen skal posisjoneres i forhold til Popover-vinduet.
   * Brukes også av Popover for å bestemme hvordan Popover-vinduet skal posisjoneres i forhold til ankeret.
   * Mulige verdier: `over`, `over-venstre`, `over-hoyre`, `under`, `under-venstre`, `under-hoyre`, `venstre`,
   * `hoyre`
   */
  orientering?: PopoverOrientering | string;
  /**
   * CSS-stiler for absolutt posisjonering av popover vindu og pil. Brukes av Popover for dynamisk
   * justering av posisjon ved resize og scroll.
   */
  posisjon?: PopoverPosisjonShape;
  /**
   * Bestemmer om pilen skal rendres eller ikke.
   */
  utenPil?: boolean;
  /**
   * React-referanse til intern `<div>`
   */
  innerRef?: React.RefObject<HTMLDivElement>;
}

const Popover = ({ anchor, children, ...props }: PopoverProps) => {
  const popperElement = useRef<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(anchor, popperElement.current, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement.current } },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <>
      <div
        className="popover"
        onClick={(e) => e.stopPropagation()}
        ref={popperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
        <div ref={arrowElement} style={styles.arrow} />
      </div>
    </>
  );
};

export default Popover;
