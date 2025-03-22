import { Box, Table } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";

function TableV2(props: ExtractPortableComponentProps<"tabell_v2">) {
  const { rows } = props.value;

  if (!rows || rows.length < 2) {
    return null;
  }

  const header = rows[0].cells;
  const content = rows.slice(1);

  if (!header || !content) {
    return null;
  }

  return (
    <Box overflowX="auto" data-block-margin="space-28" asChild>
      <Table>
        <Table.Header>
          <Table.Row>
            {header?.map((cell, y) => (
              <Table.HeaderCell key={y} scope="col">
                {cell}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {content?.map((row) => (
            <Table.Row key={row?._key}>
              {row?.cells?.map((cell, y) => (
                <Table.DataCell key={y}>{cell}</Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}

export { TableV2 };
