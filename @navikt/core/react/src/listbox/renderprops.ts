import { CSSProperties, ReactNode, useMemo } from "react";

export interface StyleRenderProps<T> {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
  className?: string | ((values: T) => string);
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
  style?: CSSProperties | ((values: T) => CSSProperties);
}

export interface RenderProps<T> extends StyleRenderProps<T> {
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?: ReactNode | ((values: T) => ReactNode);
}

interface RenderPropsHookOptions<T> extends RenderProps<T> {
  values: T;
  defaultChildren?: ReactNode;
  defaultClassName?: string;
}

export function useRenderProps<T>(props: RenderPropsHookOptions<T>) {
  const {
    className,
    style,
    children,
    defaultClassName,
    defaultChildren,
    values,
  } = props;

  return useMemo(() => {
    let computedClassName: string | undefined;
    let computedStyle: React.CSSProperties | undefined;
    let computedChildren: React.ReactNode | undefined;

    if (typeof className === "function") {
      computedClassName = className(values);
    } else {
      computedClassName = className;
    }

    if (typeof style === "function") {
      computedStyle = style(values);
    } else {
      computedStyle = style;
    }

    if (typeof children === "function") {
      computedChildren = children(values);
    } else if (children == null) {
      computedChildren = defaultChildren;
    } else {
      computedChildren = children;
    }

    return {
      className: computedClassName ?? defaultClassName,
      style: computedStyle,
      children: computedChildren,
    };
  }, [className, style, children, defaultClassName, defaultChildren, values]);
}
