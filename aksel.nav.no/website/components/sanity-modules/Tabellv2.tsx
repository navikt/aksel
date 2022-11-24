import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { Table } from "@navikt/ds-react";

const TableComponent = ({
  node,
}: {
  node: SanityT.Schema.tabell_v2;
}): JSX.Element => {
  console.log(node);
  if (!node || !node.rows || node.rows.length < 2) {
    return null;
  }

  return (
    <div className="mb-8 overflow-x-auto">
      <Table>
        <Table.Header>
          <Table.Row>
            {node?.rows[0].cells?.map((cell, y) => (
              <Table.HeaderCell key={y} className="text-gray-800" scope="col">
                {cell}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node?.rows?.slice?.(1)?.map((row) => (
            <Table.Row key={row?._key}>
              {row?.cells?.map((cell, y) => (
                <Table.DataCell key={y}>{cell}</Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default withErrorBoundary(TableComponent, "Tabell_V2");
