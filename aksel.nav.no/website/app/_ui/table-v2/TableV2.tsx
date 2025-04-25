import { Box } from "@navikt/ds-react";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@navikt/ds-react/Table";
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
        <TableHeader>
          <TableRow>
            {header?.map((cell, y) => (
              <TableHeaderCell key={y} scope="col">
                {cell}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {content?.map((row) => (
            <TableRow key={row?._key}>
              {row?.cells?.map((cell, y) => (
                <TableDataCell key={y}>{cell}</TableDataCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export { TableV2 };
