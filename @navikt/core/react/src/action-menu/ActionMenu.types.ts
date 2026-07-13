type ActionMenuGroupLabelingProps =
  | {
      /**
       * Adds a visual and accessible label to the group.
       */
      label: string;
      /**
       * Adds an aria-label to the group.
       */
      "aria-label"?: never;
    }
  | {
      /**
       * Adds an aria-label to the group.
       */
      "aria-label": string;
      /**
       * Adds a visual and accessible label to the group.
       */
      label?: never;
    };

export type { ActionMenuGroupLabelingProps };
