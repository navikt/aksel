// https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx
import * as React from "react";
import mergeRefs from "./mergeRefs";

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
      console.error(
        "Aksel: Components using 'asChild' expects to recieve a single React element child."
      );
      return React.Children.only(null);
    }

    return null;
  }
);

function mergeProps(
  slotProps: Record<string, any>,
  childProps: Record<string, any>
) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
}
