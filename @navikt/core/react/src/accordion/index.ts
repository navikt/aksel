"use client";
export { type AccordionProps, default as Accordion } from "./Accordion";
export {
  default as AccordionHeader,
  type AccordionHeaderProps,
} from "./AccordionHeader";
export {
  default as AccordionContent,
  type AccordionContentProps,
} from "./AccordionContent";
export {
  default as AccordionItem,
  type AccordionItemProps,
} from "./AccordionItem";

// Individual named exports for tree-shaking (new multipart namespace pattern)
export { default as AccordionRoot, type AccordionProps as AccordionRootProps } from "./Accordion";
