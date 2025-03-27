"use client";

import { createContext, useContext } from "react";
import { CopyButton } from "@navikt/ds-react";
import styles from "./AkselTable.module.css";

const TableContext = createContext<boolean>(false);

function AkselTable({
  children,
  th,
  withCopy,
}: {
  children: React.ReactNode;
  th: { text: string; hideOnSm?: boolean; sronly?: boolean }[];
  withCopy?: boolean;
}) {
  return (
    <table data-block-margin="space-28" className={styles.akselTable}>
      <thead>
        <tr className={styles.akselTableHeadTr}>
          {th.map((x) => (
            <th
              key={x.text}
              className={styles.akselTableTh}
              data-hide={x.hideOnSm ? "sm" : undefined}
            >
              {x?.sronly ? <span className="sr-only">{x.text}</span> : x.text}
            </th>
          ))}
          {withCopy && (
            <th data-hide="sm" className={styles.akselTableTh}>
              <span className="sr-only">Kopi</span>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        <TableContext.Provider value={withCopy ?? false}>
          {children}
        </TableContext.Provider>
      </tbody>
    </table>
  );
}

function AkselTableRow({
  tr,
  copyText = "",
}: {
  tr: { text: string | React.ReactNode; hideOnSm?: boolean }[];
  copyText?: string;
}) {
  const useCopy = useContext(TableContext);

  return (
    <tr className={styles.akselTableTr}>
      {tr.map((x, xi) => (
        <td key={xi} data-hide="sm" className={styles.akselTableTd}>
          {x.text}
        </td>
      ))}
      {useCopy && (
        <td data-hide="sm" className={styles.akselTableTd}>
          <CopyButton
            copyText={copyText}
            title={`${copyText.replace("--a-", "")} kopier`}
            size="small"
            className="ml-auto"
          />
        </td>
      )}
    </tr>
  );
}

export { AkselTable, AkselTableRow };
