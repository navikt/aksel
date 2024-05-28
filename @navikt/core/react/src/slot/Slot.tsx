import * as React from "react";
import { mergeRefs } from "../util/hooks/useMergeRefs";
import { mergeProps } from "./merge-props";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      return React.cloneElement<any>(children, {
        ...mergeProps(slotProps, children.props),
        ref: forwardedRef
          ? mergeRefs([forwardedRef, (children as any).ref])
          : (children as any).ref,
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
  },
);
