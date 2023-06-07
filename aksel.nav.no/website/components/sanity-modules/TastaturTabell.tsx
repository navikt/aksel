import { withErrorBoundary } from "@/error-boundary";
import { UUTableT } from "@/types";
import cl from "clsx";
import React from "react";

const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cl(
      "mx-05 my-0 inline-block min-w-[2rem] rounded-md border border-gray-300 bg-gray-100 px-2 py-[1px] text-center font-mono text-sm text-gray-900"
    )}
    {...props}
  />
);

const UuSeksjon = ({ node }: { node: UUTableT }) => {
  if (!node || !node?.tastatur) {
    return null;
  }

  const getKey = (s: string) => (
    <span className="flex w-full flex-wrap gap-x-1 gap-y-2">
      {s
        .trim()
        .split(" ")
        .map((x, i, arr) => (
          <React.Fragment key={x}>
            <KBD>{x}</KBD>
            {i !== arr.length - 1 && <span>+</span>}
          </React.Fragment>
        ))}
    </span>
  );

  return (
    <table className="mb-7 w-full border-separate border-spacing-0 rounded border border-gray-300">
      <thead>
        <tr className="rounded-t text-left">
          <th className="font-regular rounded-tl bg-gray-50 p-2 ">Kommando</th>
          <th className="font-regular rounded-tr bg-gray-50 p-2 ">
            Interaksjon
          </th>
        </tr>
      </thead>
      <tbody className="">
        {node.tastatur.map((x) => (
          <tr
            key={x._key}
            className="peer border-b border-t border-gray-300 text-base last-of-type:rounded-b"
          >
            <td className="border-r border-t border-gray-300 p-2">
              {getKey(x.key)}
            </td>
            <td className="border-t border-gray-300 p-2">{x.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default withErrorBoundary(UuSeksjon, "UuSeksjon");
