import React from "react";
import { useMergeRefs } from "../../hooks";
import { mergeProps } from "./merge-props";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Workaround for RSC related issue.
 * https://github.com/radix-ui/primitives/issues/3776#issuecomment-3649236326
 */
function unwrapLazy(element: React.ReactNode) {
  const arr = React.Children.toArray(element);
  return arr.length === 1 ? arr[0] : element;
}

function getChildRef(children: React.ReactNode): React.Ref<HTMLElement> | null {
  if (!React.isValidElement(children)) {
    return null;
  }
  return Object.prototype.propertyIsEnumerable.call(children.props, "ref")
    ? (children.props as any).ref // React 19 (children.ref still works, but gives a warning)
    : (children as any).ref; // React <19
}

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  const resolvedChildren = unwrapLazy(children);

  const childRef = getChildRef(resolvedChildren);
  const mergedRef = useMergeRefs(forwardedRef, childRef);

  if (React.isValidElement(resolvedChildren)) {
    return React.cloneElement<any>(resolvedChildren, {
      ...mergeProps(slotProps, resolvedChildren.props as any),
      ref: mergedRef,
    });
  }

  if (React.Children.count(resolvedChildren) > 1) {
    const error = new Error(
      "Aksel: Components using 'asChild' expects to recieve a single React element child.",
    );
    error.name = "SlotError";
    Error.captureStackTrace?.(error, Slot);
    throw error;
  }

  console.error(
    "Aksel: Slot component expected a valid React element child.",
    children,
  );

  return null;
});

export { Slot, type SlotProps };
