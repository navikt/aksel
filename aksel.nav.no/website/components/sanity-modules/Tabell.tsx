import { withErrorBoundary } from "@/error-boundary";
import { TableT } from "@/types";
import { Table } from "@navikt/ds-react";

const TableComponent = ({ node }: { node: TableT }) => {
  if (!node || !node.rows || node.rows.length < 2) {
    return null;
  }

  return (
    <div className="table-heading-margin mb-8 overflow-x-auto">
      <Table>
        <Table.Header>
          <Table.Row>
            {node?.rows[0].cells?.map((cell, y) => (
              <Table.HeaderCell
                key={y}
                className="text-text-subtle"
                scope="col"
              >
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
      <style global jsx>{`
        .navds-body-long.navds-typo--spacing + .table-heading-margin {
          margin-top: -1rem;
        }
        .table-heading-margin + .navds-heading {
          margin-top: var(--a-spacing-12);
        }
      `}</style>
    </div>
  );
};

export default withErrorBoundary(TableComponent, "Tabell");
