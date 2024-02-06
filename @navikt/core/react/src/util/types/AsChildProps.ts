export type AsChildProps =
  | {
      children: React.ReactElement | false | null;
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
       * <MergedComponent data-prop data-child />
       * ```
       */
      asChild: true;
    }
  | {
      children: React.ReactNode;
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
       * <MergedComponent data-prop data-child />
       * ```
       */
      asChild?: false;
    };
