import docs from "@navikt/ds-tokens/docs.json";
import { CopyButton } from "@navikt/ds-react";

export const SpacingView = ({ cat }: { cat: string }) => {
  const spacings = docs[cat];

  return (
    <table className="mb-7 w-full border-separate border-spacing-0 rounded border border-gray-200">
      <thead>
        <tr className="rounded-t">
          <td className="rounded-tl bg-gray-50 p-2">Token</td>
          <td className="bg-gray-50 p-2">Rem</td>
          <td className="bg-gray-50 p-2 ">px</td>
          <td className="hidden rounded-tr bg-gray-50 p-2 sm:table-cell">
            <span className="sr-only">Kopi</span>
          </td>
        </tr>
      </thead>
      <tbody className="">
        {spacings.map((x) => (
          <tr
            key={x._key}
            className="peer border-b border-t border-gray-200 text-base last-of-type:rounded-b"
          >
            <td className="border-t border-gray-200 px-2 py-1">
              {x.name.replace("--a-spacing-", "")}
            </td>
            <td className="border-t border-gray-200 px-2 py-1">
              {x.value.replace("rem", "")}
            </td>
            <td className="border-t border-gray-200 px-2 py-1">
              {Number(x.value.replace("rem", "") * 16)}
            </td>
            <td className="hidden items-center justify-between border-t border-gray-200 px-2 py-1 pr-4 sm:flex">
              <div
                className="bg-surface-alt-3-strong mr-auto h-8 rounded-md"
                style={{
                  width: x.value,
                }}
              />
              <CopyButton copyText={x.name} size="small" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
