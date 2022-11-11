import { SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import core from "@navikt/ds-css/tokens.json";
import internal from "@navikt/ds-css-internal/tokens.json";
import { useState } from "react";
import { Expand } from "@navikt/ds-icons";
import cl from "classnames";

const TokenTable = ({ node }: { node: SanityT.Schema.token_kategori }) => {
  const [open, setOpen] = useState(false);

  const tokens: { [key: string]: string } | null =
    node.title in core
      ? core[node.title]
      : node.title in internal
      ? internal[node.title]
      : null;

  if (!tokens) {
    return null;
  }

  const showMore = Object.keys(tokens).length > 8;

  return (
    <div className="mb-7">
      <div
        className={cl({
          "after:to-bg-default relative max-h-80 overflow-y-hidden after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent":
            !open && showMore,
        })}
      >
        <table className="border-border-divider w-full border-separate border-spacing-0 rounded border">
          <thead>
            <tr className="rounded-t">
              <td className="rounded-tl bg-gray-50 p-2 ">Token</td>
              <td className="rounded-tr bg-gray-50 p-2 ">Fallback</td>
            </tr>
          </thead>
          <tbody className="">
            {Object.entries(tokens).map(([key, val]) => (
              <tr
                key={key}
                className="peer border-b border-t border-gray-300 font-mono text-sm last-of-type:rounded-b"
              >
                <td className="border-t border-r border-gray-300 p-2">{key}</td>
                <td className="border-t border-gray-300 p-2">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!open && showMore && (
        <button
          onClick={() => setOpen(true)}
          className="text-medium  group mx-auto flex shrink-0 -translate-y-3/4 flex-col items-center focus:outline-none"
        >
          <span className="group-focus-visible:bg-border-focus group-focus-visible:text-text-on-action group-focus-visible:shadow-focus">
            Se alle tokens
          </span>
          <Expand
            className="h-4 w-4 transition-all group-hover:translate-y-1"
            aria-hidden
          />
        </button>
      )}
    </div>
  );
};

export default withErrorBoundary(TokenTable, "Token-tabell");
