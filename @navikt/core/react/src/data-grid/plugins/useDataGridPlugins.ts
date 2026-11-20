/**
 * Table plugin: transforms render props of DataGrid at a structural level.
 */
export interface TablePlugin {
  /** Wrap the table output in context providers */
  transformTableContext?: (children: React.ReactNode) => React.ReactNode;
}

function useDataGridPlugins(
  userPlugins: Record<string, TablePlugin> | undefined,
) {}
