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
}

export type { AutoCompleteOption, OptionGroup };
