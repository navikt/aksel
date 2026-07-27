interface OptionGroup<T> {
  label: string;
  options: T[];
}

interface AutoCompleteOption {
  value: string;
  label: string;
  tags?: string[];
  description?: string;
  /**
   * Marks a suggestion that turns `value` into a free-text token.
   * Selecting it skips property/operator parsing of `value`.
   */
  freeText?: boolean;
  /**
   * Set for operators of type "multiple". Rendered with a checkbox, and
   * selecting it toggles the value in the query instead of creating a token.
   */
  multiSelect?: {
    value: string;
    selected: boolean;
  };
}

export type { AutoCompleteOption, OptionGroup };
