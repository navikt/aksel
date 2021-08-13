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

type SafeProps<As, ComponentType> = Omit<As, "as" | keyof ComponentType>;

type IntrinsicProps<
  Component,
  As extends keyof JSX.IntrinsicElements
> = Component &
  SafeProps<JSXIntrinsicElementProps<As>, Component> & {
    as: As;
  };

type CustomComponentProps<
  Component,
  As extends React.JSXElementConstructor<any>
> = As extends React.JSXElementConstructor<infer InferredAs>
  ? Component &
      SafeProps<InferredAs, Component> & {
        as: As;
      }
  : never;

export default interface OverridableComponent<
  Element extends HTMLElement,
  Component
> {
  (props: ForwardRefProps<Element, Component>): ReturnType<React.FC>;

  <As extends keyof JSX.IntrinsicElements, Element extends HTMLElement>(
    props: ForwardRefProps<Element, IntrinsicProps<Component, As>>
  ): ReturnType<React.FC>;

  <As extends React.JSXElementConstructor<any>, R = unknown>(
    props: ForwardRefProps<R, CustomComponentProps<Component, As>>
  ): ReturnType<React.FC>;
}
