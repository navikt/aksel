export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export interface OverridableComponent<Component, Element extends HTMLElement> {
  (props: Component & React.RefAttributes<Element>): ReturnType<React.FC>;

  <As extends React.ElementType>(
    props: {
      as: As;
    } & Component &
      DistributiveOmit<React.ComponentPropsWithRef<As>, keyof Component>
  ): ReturnType<React.FC>;
}
