export type PrimitiveAsChildProps =
  | {
      children: React.ReactElement | false | null;
      /**
       * Renders the component and its child as a single element,
       * merging the props of the component with the props of the child.
       *
       * @example
       * <Component asChild data-prop>
       *   <ChildComponent data-child />
       * </Component>
       *
       * // Renders
       * <div data-prop data-child />
       */
      asChild: true;
      /**
       * Implements [OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent)
       *
       * When using asChild, the prop is not allowed as it would have no effect.
       */
      as?: never;
    }
  | {
      children?: React.ReactNode;
      /**
       * Renders the component and its child as a single element,
       * merging the props of the component with the props of the child.
       *
       * @example
       * <Component asChild data-prop>
       *   <ChildComponent data-child />
       * </Component>
       *
       * // Renders
       * <div data-prop data-child />
       */
      asChild?: false;
    };
