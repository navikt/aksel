import docs from "@navikt/ds-tokens/docs.json";
import { CopyButton } from "@navikt/ds-react";
import { sanitizeName } from "../utilities";

export const FontView = ({ cat }: { cat: string }) => {
  const fonts = docs[cat];

  return (
    <table className="mb-7 w-full border-separate border-spacing-0 rounded border border-gray-200">
      <thead>
        <tr className="rounded-t text-left">
          <th className="font-regular rounded-tl bg-gray-50 p-2">Token</th>
          <th className="font-regular bg-gray-50 p-2">Verdi</th>
          <th className="font-regular bg-gray-50 p-2">
            <span className="sr-only">Demo</span>
          </th>
          <th className="font-regular hidden rounded-tr bg-gray-50 p-2 sm:table-cell">
            <span className="sr-only">Kopi</span>
          </th>
        </tr>
      </thead>
      <tbody className="">
        {fonts.map((x) => (
          <tr
            key={x.value}
            className="peer border-b border-t border-gray-200 text-base last-of-type:rounded-b"
          >
            <td className="border-t border-gray-200 px-2 py-1">
              {sanitizeName(x.name.replace("--a-font-", ""))}
            </td>
            <td className="border-t border-gray-200 px-2 py-1">{x.value}</td>
            {getDemoCell(x)}
            <td className="hidden  justify-between border-t border-gray-200 px-2 py-1 pr-4 sm:table-cell">
              <CopyButton copyText={x.name} size="small" className="ml-auto" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  /* return (
    <Frame
      tokens={shapes}
      styles="borderRadius"
      element={({ token, name }: { token: string; name?: string }) => {
        if (name.includes("font-family")) {
          return (
            <div
              className="min-h-16 bg-surface-default flex h-full w-full items-end rounded-md px-4 text-xl"
              aria-hidden
            >
              {text}
            </div>
          );
        }
        if (name.includes("font-weight")) {
          return (
            <div
              className="min-h-16 bg-surface-default flex h-full w-full items-end rounded-md px-4 text-xl"
              aria-hidden
              style={{
                fontWeight: token,
              }}
            >
              {text}
            </div>
          );
        }
        if (name.includes("font-line-height")) {
          return (
            <div className="bg-surface-default">
              <div
                className="min-h-16  flex h-full max-w-xs items-end rounded-md px-4 text-xl"
                aria-hidden
                style={{
                  lineHeight: token,
                }}
              >
                {text}
              </div>
            </div>
          );
        }
        if (name.includes("font-size")) {
          return (
            <div
              className="min-h-16 bg-surface-default flex h-full w-full items-end rounded-md px-4 text-xl"
              aria-hidden
              style={{
                fontSize: token,
                fontWeight: name.includes("size-heading") ? "600" : "400",
                lineHeight: 1.33,
              }}
            >
              {text}
            </div>
          );
        }
        return null;
      }}
    />
  ); */
};

function getDemoCell({ value, name }: { value: string; name: string }) {
  switch (true) {
    case name.includes("weight"):
      return (
        <td
          style={{ fontWeight: value }}
          className="border-t border-gray-200 px-2 py-1"
        >
          Foreldrepenger
        </td>
      );
    case name.includes("line-height"):
      return (
        <td
          style={{ lineHeight: value }}
          className="border-t border-gray-200 px-2 py-1"
        >
          Hello <br />
          World
        </td>
      );
    case name.includes("size-heading"):
      return (
        <td
          style={{ fontSize: value }}
          className="border-t border-gray-200 px-2 py-1 font-semibold"
        >
          Aa
        </td>
      );
    case name.includes("size"):
      return (
        <td
          style={{ fontSize: value }}
          className="border-t border-gray-200 px-2 py-1 "
        >
          Aa
        </td>
      );
    default:
      return (
        <td className="border-t border-gray-200 px-2 py-1">Foreldrepenger</td>
      );
  }
}
