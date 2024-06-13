export type PrimitiveWithAsChild =
  | {
      children: React.ReactElement | false | null;
      /**
       * Renders the component and its child as a single element,
       * merging the props of the component with the props of the child.
       * @example
       * ```tsx
       * <Component asChild data-prop>
       *   <ChildComponent data-child />
       * </Component>
       *
       * // Renders
       * <div data-prop data-child />
       * ```
       */
      asChild: true;
      /**
       * When using asChild, the `as` prop is not allowed.
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
       * ```tsx
       * <Component asChild data-prop>
       *   <ChildComponent data-child />
       * </Component>
       *
       * // Renders
       * <div data-prop data-child />
       * ```
       */
      asChild?: false;
    };
