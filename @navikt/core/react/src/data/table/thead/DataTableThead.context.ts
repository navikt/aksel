import React, { createContext } from "react";

const DataTableTheadContext = createContext<boolean>(false);

function useDataTableThead(): boolean {
  const context = React.useContext(DataTableTheadContext);
  return context;
}

export { DataTableTheadContext, useDataTableThead };
