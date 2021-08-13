type ForwardRefProps<T, P> = React.PropsWithoutRef<P> & React.RefAttributes<T>;

type SafeProps<As, ComponentType> = Omit<
  As,
  "as" | "ref" | keyof ComponentType
>;

type IntrinsicProps<
  Component,
  As extends keyof JSX.IntrinsicElements
> = Component &
  SafeProps<JSX.IntrinsicElements[As], Component> & {
    as: As;
  };

type CustomComponentProps<Component, As extends React.ElementType> = Component &
  SafeProps<React.ComponentProps<As>, Component> & {
    as: As;
  };

export default interface OverridableComponent<
  Element extends HTMLElement,
  Component
> {
  (props: ForwardRefProps<Element, Component>): ReturnType<React.FC>;

  <As extends keyof JSX.IntrinsicElements, Element extends HTMLElement>(
    props: ForwardRefProps<Element, IntrinsicProps<Component, As>>
  ): ReturnType<React.FC>;

  <As extends React.JSXElementConstructor<any>, Element = unknown>(
    props: ForwardRefProps<Element, CustomComponentProps<Component, As>>
  ): ReturnType<React.FC>;
}
