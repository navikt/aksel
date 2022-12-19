import { Detail } from "@navikt/ds-react";
import { CopyToken } from "./CopyToken";

export const Frame = ({
  tokens,
  styles,
  element: Element,
}: {
  tokens: { name: string; value: string; description?: string }[];
  styles: string;
  element?: ({ token, name }: { token: string; name?: string }) => JSX.Element;
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
            className="shadow-small ring-border-subtle flex flex-col justify-start rounded-md p-3 align-top ring-1"
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
              {c.description}
            </Detail>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
