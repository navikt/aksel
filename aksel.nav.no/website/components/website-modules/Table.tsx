import cl from "clsx";
import { createContext, useContext } from "react";
import { CopyButton } from "@navikt/ds-react";

const TableContext = createContext<boolean>(false);

export function AkselTable({
  children,
  th,
  withCopy,
}: {
  children: React.ReactNode;
  th: { text: string; hideOnSm?: boolean; sronly?: boolean }[];
  withCopy?: boolean;
}) {
  return (
    <table className="mb-7 w-full border-separate border-spacing-0 rounded-lg border border-border-subtle">
      <thead>
        <tr className="rounded-t-lg text-left">
          {th.map((x) => (
            <th
              key={x.text}
              className={cl(
                "bg-surface-subtle p-2 font-regular first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg",
                {
                  "hidden sm:table-cell": !!x.hideOnSm,
                },
              )}
            >
              {x?.sronly ? <span className="sr-only">{x.text}</span> : x.text}
            </th>
          ))}
          {withCopy && (
            <th className="hidden bg-surface-subtle p-2 font-regular last-of-type:rounded-tr-lg sm:table-cell">
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

export function AkselTableRow({
  tr,
  copyText = "",
}: {
  tr: { text: string | React.ReactNode; hideOnSm?: boolean }[];
  copyText?: string;
}) {
  const useCopy = useContext(TableContext);

  return (
    <tr className="peer border-b border-t border-gray-200 text-base last-of-type:rounded-b-lg">
      {tr.map((x, xi) => (
        <td
          key={xi}
          className={cl("border-t border-gray-200 px-2 py-1", {
            "hidden sm:table-cell": !!x.hideOnSm,
          })}
        >
          {x.text}
        </td>
      ))}
      {useCopy && (
        <td className="hidden border-t border-gray-200 px-2 py-1 sm:table-cell">
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
