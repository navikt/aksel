import React, { forwardRef } from "react";
import cl from "classnames";

type ForwardRefProps<T, P = {}> = React.PropsWithoutRef<
  React.PropsWithChildren<P>
> &
  React.RefAttributes<T>;

type JSXIntrinsicElementProps<
  K extends keyof JSX.IntrinsicElements,
  REF extends boolean = false
> = REF extends true
  ? JSX.IntrinsicElements[K]
  : Omit<JSX.IntrinsicElements[K], "ref">;

interface AccordionMenuItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
}

type SafeProps<P> = Omit<P, "component" | keyof AccordionMenuItemProps>;

type AccordionMenuItemIntrinsicProps<
  K extends keyof JSX.IntrinsicElements
> = AccordionMenuItemProps &
  SafeProps<JSXIntrinsicElementProps<K>> & {
    component: K;
  };

type AccordionMenuItemCustomComponentProps<
  C extends React.JSXElementConstructor<any>
> = C extends React.JSXElementConstructor<infer P>
  ? AccordionMenuItemProps &
      SafeProps<P> & {
        component: C;
      }
  : never;

export interface AccordionMenuItemType {
  (
    props: ForwardRefProps<HTMLAnchorElement, AccordionMenuItemProps>
  ): ReturnType<React.FC>;

  <T extends keyof JSX.IntrinsicElements, R extends HTMLElement>(
    props: ForwardRefProps<R, AccordionMenuItemIntrinsicProps<T>>
  ): ReturnType<React.FC>;

  <T extends React.JSXElementConstructor<any>, R = unknown>(
    props: ForwardRefProps<R, AccordionMenuItemCustomComponentProps<T>>
  ): ReturnType<React.FC>;
}

const AccordionMenuItem: AccordionMenuItemType = forwardRef(
  (
    {
      children,
      component: Component = "a",
      active = false,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("navds-accordion-menu-item", className, {
          "navds-accordion-menu-item--active": active,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default AccordionMenuItem;
