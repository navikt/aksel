import React from "react";
import { mergeRefs } from "../util/hooks/useMergeRefs";
import { mergeProps } from "./merge-props";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    const childRef = Object.prototype.propertyIsEnumerable.call(
      children.props,
      "ref",
    )
      ? (children.props as any).ref // React 19 (children.ref still works, but gives a warning)
      : (children as any).ref; // React <19

    return React.cloneElement<any>(children, {
      ...mergeProps(slotProps, children.props as any),
      ref: forwardedRef ? mergeRefs([forwardedRef, childRef]) : childRef,
    });
  }

  if (React.Children.count(children) > 1) {
    const error = new Error(
      "Aksel: Components using 'asChild' expects to recieve a single React element child.",
    );
    error.name = "SlotError";
    Error.captureStackTrace?.(error, Slot);
    throw error;
  }

  return null;
});

export { Slot, type SlotProps };
