import { Table } from "@navikt/ds-react";
import React from "react";
import { SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import cl from "classnames";
import { Close, SuccessStroke } from "@navikt/ds-icons";

const TableComponent = ({
  node,
}: {
  node: SanityT.Schema.tabell;
}): JSX.Element => {
  if (!node || !node.powerTable || node.powerTable?.rows?.length < 2) {
    return null;
  }

  return (
    <div className="mb-8 overflow-x-auto">
      <Table>
        <Table.Header>
          <Table.Row>
            {node.powerTable?.rows[0].cells?.map((cell) => (
              <Table.HeaderCell key={cell?._key} className="text-gray-800">
                <SanityBlockContent blocks={cell?.data?.body} noLastMargin />
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node.powerTable?.rows?.slice?.(1)?.map((row) => (
            <Table.Row key={row?._key}>
              {row?.cells?.map((cell) => (
                <Table.DataCell
                  key={cell?._key}
                  rowSpan={cell?.rowSpan}
                  colSpan={cell?.colSpan}
                  className={cl({
                    "bg-green-50": cell?.data?.status === "suksess",
                    "bg-red-50": cell?.data?.status === "feil",
                  })}
                >
                  <SanityBlockContent blocks={cell?.data?.body} noLastMargin />
                  {!cell?.data?.body ? (
                    cell?.data?.status === "suksess" ? (
                      <SuccessStroke
                        className="mx-auto text-xl"
                        aria-label="ok"
                        aria-hidden
                      />
                    ) : cell?.data?.status === "feil" ? (
                      <Close
                        className="mx-auto text-xl"
                        aria-label="feil"
                        aria-hidden
                      />
                    ) : null
                  ) : null}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default withErrorBoundary(TableComponent, "Tabell");
