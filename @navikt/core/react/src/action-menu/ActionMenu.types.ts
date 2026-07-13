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

type ActionMenuShortcutProp = {
  /**
   * Shows connected shortcut-keys for the item.
   * This is only a visual representation, you will have to implement the actual shortcut yourself.
   */
  shortcut?: string;
};

export type { ActionMenuGroupLabelingProps };
export type { ActionMenuShortcutProp };
