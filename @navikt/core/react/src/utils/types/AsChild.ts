export type AsChild =
  | {
      children: React.ReactElement;
      /**
       * Renders the children as a child of the component. Merges the props of the component with the props of the child.
       */
      asChild: true;
    }
  | {
      children: React.ReactNode;
      /**
       * Renders the children as a child of the component. Merges the props of the component with the props of the child.
       */
      asChild?: false;
    };
