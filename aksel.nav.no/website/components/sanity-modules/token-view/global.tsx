import docs from "@navikt/ds-tokens/docs.json";
import { CopyToken } from "./CopyToken";

const GlobalView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  return (
    <table className="w-full">
      <thead className="sr-only">
        <tr>
          <th></th>
          <th>Token navn</th>
          <th>Verdi</th>
        </tr>
      </thead>
      <tbody className="component-token-grid">
        {colors.map((c) => (
          <tr
            key={c.name}
            className="shadow-small ring-border-subtle grid rounded-md p-3 ring-1"
          >
            <td className="component-checkered-bg rounded-md p-0">
              <div
                style={{ background: c.value }}
                className="min-h-14 w-full rounded-md"
                aria-hidden
              />
            </td>
            <td className="mt-2">
              <CopyToken val={c.name} />
            </td>
            <td className="mt-1 font-mono text-sm">{c.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GlobalView;

/* <ul className="flex flex-col gap-1">
      {colors.map((c) => (
        <li key={c.name} className="grid w-full grid-cols-2 gap-4">
          <div
            style={{ background: c.value }}
            className="min-h-20 ring-border-subtle rounded-md ring-1 ring-inset"
          />
          <div className="flex flex-col justify-center gap-2">
            <CopyToken val={c.name} />
            <span className="font-mono text-sm">{c.value}</span>
          </div>
        </li>
      ))}
    </ul> */
