export type AsChildProps =
  | {
      children: React.ReactElement | false | null;
      /**
       * Renders the component and its child as a single element,
       * merging the props of the component with the props of the child.
       *
       * @example
       * ```
       * <Component asChild data-prop>
       *   <ChildComponent data-child />
       * </Component>
       *
       * Out:
       * <MergedComponent data-prop data-child />
       * ```
       */
      asChild: true;
      as?: never;
    }
  | {
      children: React.ReactNode;
      /**
       * Renders the component and its child as a single element,
       * merging the props of the component with the props of the child.
       *
       * @example
       * ```
       * <Component asChild data-prop>
       *   <ChildComponent data-child />
       * </Component>
       *
       * Out:
       * <MergedComponent data-prop data-child />
       * ```
       */
      asChild?: false;
    };
