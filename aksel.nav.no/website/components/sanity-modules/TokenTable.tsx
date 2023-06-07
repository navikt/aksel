import { withErrorBoundary } from "@/error-boundary";
import { TokenTableT } from "@/types";
import { ChevronDownCircleIcon } from "@navikt/aksel-icons";
import core from "@navikt/ds-css/tokens.json";
import { BodyLong, CopyButton, Label, Link } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import { useState } from "react";

const TokenTable = ({ node }: { node: TokenTableT }) => {
  const [open, setOpen] = useState(false);

  const tokens: { [key: string]: string } | null =
    node.title in core ? core[node.title] : null;

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
        <table className="border-border-divider w-full border-separate border-spacing-0 rounded-t border">
          <thead>
            <tr className="rounded-t text-left">
              <th className="font-regular rounded-tl bg-gray-50 p-2 ">Token</th>
              <th className="font-regular rounded-tr bg-gray-50 p-2 ">
                Fallback
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tokens).map(([key, val]) => (
              <tr
                key={key}
                className="peer border-b border-t border-gray-300 font-mono text-sm last-of-type:rounded-b"
              >
                <td className="border-r border-t border-gray-300 p-2">{key}</td>
                <td className="border-t border-gray-300 p-2">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(open || !showMore) && (
          <div className="border-border-divider bg-surface-neutral-subtle relative w-full rounded-b border border-t-0 p-2 pr-14">
            <CopyButton
              copyText={Object.entries(tokens).reduce(
                (prev, cur) =>
                  prev +
                  `${cur[0]}: ${
                    cur[1].startsWith("--") ? `var(${cur[1]})` : `${cur[1]}`
                  };\n`,
                ""
              )}
              className="absolute right-2 top-2 z-10"
            />
            <Label size="small" as="span" spacing>
              Hva er dette?
            </Label>
            <BodyLong size="small">
              Komponent-tokens gir deg muligheten til å sette opp theming eller
              justere styling uten å måtte overskrive css-klasser. Les gjennom{" "}
              <NextLink
                href="/grunnleggende/styling/design-tokens#hec62d38bc813"
                passHref
                legacyBehavior
              >
                <Link>guiden vår</Link>
              </NextLink>{" "}
              eller utforsk alle{" "}
              <NextLink
                href="/grunnleggende/styling/design-tokens"
                passHref
                legacyBehavior
              >
                <Link>design tokens</Link>
              </NextLink>
              .
            </BodyLong>
          </div>
        )}
      </div>
      {!open && showMore && (
        <button
          onClick={() => setOpen(true)}
          className="text-medium group mx-auto flex shrink-0 -translate-y-3/4 flex-col items-center gap-1 focus:outline-none"
        >
          <span className="group-focus-visible:bg-border-focus group-focus-visible:text-text-on-action group-focus-visible:shadow-focus">
            Se alle tokens
          </span>
          <ChevronDownCircleIcon
            className="transition-all group-hover:translate-y-1"
            aria-hidden
            fontSize="1.5rem"
          />
        </button>
      )}
    </div>
  );
};

export default withErrorBoundary(TokenTable, "Token-tabell");
