type DataGridTableSettings = {
  /**
   * Controls vertical cell padding.
   * @default "normal"
   */
  rowDensity?: "condensed" | "normal" | "spacious";
  /**
   * Zebra striped table
   * @default false
   */
  zebraStripes?: boolean;
  /**
   * Truncate content in cells and show ellipsis for overflowed text.
   *
   * **NB:** When using this together with `layout="auto"`,
   * you have to manually set a `maxWidth` on columns that should be truncated.
   * @default false if layout="auto", else true
   */
  truncateContent?: boolean;
  /**
   * Sticky columns that remain visible when horizontally scrolling the table.
   *
   * You can specify 1 sticky column on the left and 1 on the right.
   */
  stickyColumns?: {
    start?: "1";
    end?: "1";
  };
  /**
   * Adjusts font-size
   * @default "medium"
   */
  textSize?: "small" | "medium";
};

type DataGridSettings = {
  defaultValue?: { table: DataGridTableSettings };
  value?: { table: DataGridTableSettings };
  onChange?: (settings: { table: DataGridTableSettings }) => void;
};

export type { DataGridSettings, DataGridTableSettings };
