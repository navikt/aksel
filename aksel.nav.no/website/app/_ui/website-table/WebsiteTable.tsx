"use client";

import { createContext, useContext } from "react";
import { BodyShort, CopyButton } from "@navikt/ds-react";
import styles from "./WebsiteTable.module.css";

const TableContext = createContext<boolean>(false);

function WebsiteTable({
  children,
  th,
  withCopy,
}: {
  children: React.ReactNode;
  th: { text: string; hideOnSm?: boolean; sronly?: boolean }[];
  withCopy?: boolean;
}) {
  return (
    <table data-block-margin="space-28" className={styles.websiteTable}>
      <thead>
        <tr className={styles.websiteTableHeadTr}>
          {th.map((x) => (
            <th
              key={x.text}
              className={styles.websiteTableTh}
              data-hide={x.hideOnSm ? "sm" : undefined}
            >
              {x?.sronly ? (
                <BodyShort as="span" visuallyHidden>
                  {x.text}
                </BodyShort>
              ) : (
                x.text
              )}
            </th>
          ))}
          {withCopy && (
            <th data-hide="sm" className={styles.websiteTableTh}>
              <BodyShort as="span" visuallyHidden>
                Kopi
              </BodyShort>
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

function WebsiteTableRow({
  tr,
  copyText = "",
}: {
  tr: { text: string | React.ReactNode; hideOnSm?: boolean }[];
  copyText?: string;
}) {
  const useCopy = useContext(TableContext);

  return (
    <tr className={styles.websiteTableTr}>
      {tr.map((x, xi) => (
        <td
          key={xi}
          data-hide={x.hideOnSm ?? "false"}
          className={styles.websiteTableTd}
        >
          {x.text}
        </td>
      ))}
      {useCopy && (
        <td data-hide="sm" data-align="end" className={styles.websiteTableTd}>
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

export { WebsiteTable, WebsiteTableRow };
