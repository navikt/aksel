import { Detail } from "@navikt/ds-react";
import { CopyToken } from "./CopyToken";

export const Frame = ({
  tokens,
  styles,
  element: Element,
  showHex,
}: {
  tokens: { name: string; value: string; description?: string }[];
  styles?: string;
  element?: ({ token, name }: { token: string; name?: string }) => JSX.Element;
  showHex?: boolean;
}) => {
  const hasDescription = !!tokens.find((x) => x?.description);
  return (
    <table className="w-full">
      <thead className="sr-only">
        <tr>
          <td />
          <th>Token navn</th>
          <th>Verdi</th>
          {hasDescription && <th>Beskrivelse</th>}
        </tr>
      </thead>
      <tbody className="component-token-grid">
        {tokens.map((c) => (
          <tr
            key={c.name}
            className="ring-border-subtle flex flex-col justify-start rounded-md p-3 align-top ring-1"
          >
            <td className="component-checkered-bg rounded-md p-0">
              {Element ? (
                <Element token={c.value} name={c.name} />
              ) : (
                <div
                  style={{ [styles]: c.value }}
                  className="min-h-16 shadow-small h-full w-full rounded-md"
                  aria-hidden
                />
              )}
            </td>
            <td className="mt-3 w-full overflow-x-hidden">
              <CopyToken val={c.name} />
            </td>
            <td className="mt-2 font-mono text-sm tracking-tighter">
              {c.value}
            </td>
            <Detail as="td" className="mt-1">
              {showHex ? getHex(c.value) : c.description}
            </Detail>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function getHex(value: string) {
  return RGBAToHexA(value.replace(", 1)", ""));
}

/* https://stackoverflow.com/a/73401564 */
function RGBAToHexA(rgba, forceRemoveAlpha = false) {
  return (
    "#" +
    rgba
      .replace(/^rgba?\(|\s+|\)$/g, "") // Get's rgba / rgb string values
      .split(",") // splits them at ","
      .filter((string, index) => !forceRemoveAlpha || index !== 3)
      .map((string) => parseFloat(string)) // Converts them to numbers
      .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      .map((number) => number.toString(16)) // Converts numbers to hex
      .map((string) => (string.length === 1 ? "0" + string : string)) // Adds 0 when length of one number is 1
      .join("")
  ); // Puts the array to togehter to a string
}
