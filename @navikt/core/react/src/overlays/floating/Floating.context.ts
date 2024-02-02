import { createContext } from "../../util/create-context";
import { Measurable, Side } from "./Floating.types";

/**
 * Floating
 */
type FloatingContextValue = {
  anchor: Measurable | null;
  onAnchorChange(anchor: Measurable | null): void;
};

export const [FloatingProvider, useFloatingContext] =
  createContext<FloatingContextValue>({
    name: "FloatingContext",
    hookName: "useFloating",
    providerName: "FloatingProvider",
  });

/**
 * FloatingContent
 */
type FloatingContentContextValue = {
  placedSide: Side;
  onArrowChange: (arrow: HTMLSpanElement | null) => void;
  arrowX?: number;
  arrowY?: number;
  hideArrow: boolean;
};

export const [FloatingContentProvider, useFloatingContentContext] =
  createContext<FloatingContentContextValue>({
    name: "FloatingContentContext",
    hookName: "useFloatingContentContext",
    providerName: "FloatingContentProvider",
  });
