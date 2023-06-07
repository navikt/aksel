import docs from "@navikt/ds-tokens/docs.json";
import { CopyButton } from "@navikt/ds-react";
import {
  LaptopIcon,
  MobileIcon,
  MobileSmallIcon,
  MonitorIcon,
  TabletIcon,
} from "@navikt/aksel-icons";

export const BreakpointsView = ({ cat }: { cat: string }) => {
  const breakpoints = docs[cat];

  return (
    <table className="mb-7 w-full border-separate border-spacing-0 rounded border border-gray-200">
      <thead>
        <tr className="rounded-t text-left">
          <th className="font-regular rounded-tl bg-gray-50 p-2">Enhet</th>
          <th className="font-regular bg-gray-50 p-2">Verdi</th>
          <th className="font-regular hidden bg-gray-50 p-2 sm:table-cell">
            Media queries
          </th>
          <th className="font-regular bg-gray-50 p-2">Bruk</th>
          <th className="font-regular hidden rounded-tr bg-gray-50 p-2 sm:table-cell">
            <span className="sr-only">Kopi</span>
          </th>
        </tr>
      </thead>
      <tbody className="">
        {breakpoints.map((x) => {
          const Svg = getSvg(x.name);

          return (
            <tr
              key={x.value}
              className="peer border-b border-t border-gray-200 text-base last-of-type:rounded-b"
            >
              <td
                className="border-t border-gray-200 px-2 py-1 text-5xl"
                aria-hidden
              >
                {Svg}
              </td>
              <td className="border-t border-gray-200 px-2 py-1">{x.value}</td>
              <td className="hidden border-t border-gray-200 px-2 py-1 sm:table-cell">
                {x.description}
              </td>
              <td className="border-t border-gray-200 px-2 py-1">
                {Number(x.value.replace("px", "")) % 2 === 0
                  ? "Mobile first"
                  : "Desktop first"}
              </td>
              <td className="hidden border-t border-gray-200 px-2 py-1 pr-4 sm:table-cell">
                <CopyButton
                  copyText={x.name}
                  size="small"
                  className="ml-auto"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function getSvg(token: string) {
  switch (true) {
    case token.includes("xs"):
      return <MobileSmallIcon title="Mobile small" />;
    case token.includes("sm"):
      return <MobileIcon title="Mobile regular" />;

    case token.includes("md"):
      return <TabletIcon title="Tablet" />;

    case token.includes("lg"):
      return <LaptopIcon title="Laptop" />;
    case token.includes("xl"):
      return <MonitorIcon title="Dekstop" />;

    default:
      return null;
  }
}
