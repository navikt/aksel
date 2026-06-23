import { useState } from "react";
import { VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";
import { generateDataGridDemo } from "../../../components/website-modules/examples/__parts/DataGridDemoData";

const { columns, data } = generateDataGridDemo({ withSorting: true });

const Example = () => {
  const [localData, setLocalData] = useState(data);
  const [sortState, setSortState] = useState<
    DataGrid.Table.Sorting["sortOrder"]
  >([]);

  const handleSortOrderChange: DataGrid.Table.Sorting["onSortOrderChange"] = (
    newSortOrder,
  ) => {
    setSortState(newSortOrder);
    if (newSortOrder.length === 0) {
      setLocalData(data);
      return;
    }

    const sortedData = localData.toSorted((a, b) => {
      for (const sort of newSortOrder) {
        const column = columns.find((col) => col.id === sort.columnId);

        if (!column) {
          continue;
        }

        const aValue = a[sort.columnId];
        const bValue = b[sort.columnId];

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          if (comparison !== 0) {
            return sort.direction === "asc" ? comparison : -comparison;
          }
        } else if (aValue instanceof Date && bValue instanceof Date) {
          const comparison = aValue.getTime() - bValue.getTime();
          if (comparison !== 0) {
            return sort.direction === "asc" ? comparison : -comparison;
          }
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          const comparison = aValue - bValue;
          if (comparison !== 0) {
            return sort.direction === "asc" ? comparison : -comparison;
          }
        }
      }
      return 0;
    });
    setLocalData(sortedData);
  };

  return (
    <VStack height="100vh" padding="space-16">
      <DataGrid
        columns={columns}
        data={localData}
        getRowId={(row) => row.caseId}
      >
        <DataGrid.Table
          sorting={{
            allowMultiSort: true,
            sortOrder: sortState,
            onSortOrderChange: handleSortOrderChange,
          }}
        />
      </DataGrid>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "I tilfeller der data endres dynamisk, bør du bruke `getRowId` for å beholde ytelsen.",
};
