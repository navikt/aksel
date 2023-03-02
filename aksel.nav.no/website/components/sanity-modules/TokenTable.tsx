import { SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import core from "@navikt/ds-css/tokens.json";
import internal from "@navikt/ds-css-internal/tokens.json";
import { useEffect, useRef, useState } from "react";
import { Expand, SuccessStroke } from "@navikt/ds-icons";
import cl from "classnames";
import { Link, BodyLong, Label } from "@navikt/ds-react";
import NextLink from "next/link";
import copy from "copy-to-clipboard";
import { CopyIcon } from "@sanity/icons";

const TokenTable = ({ node }: { node: SanityT.Schema.token_kategori }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleCopy = () => {
    setActive(true);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(false), 2000);
    const str = Object.entries(tokens).reduce(
      (prev, cur) =>
        prev +
        `${cur[0]}: ${
          cur[1].startsWith("--") ? `var(${cur[1]})` : `${cur[1]}`
        };\n`,
      ""
    );
    copy(str);
  };

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

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
        <table className="border-border-divider w-full border-separate border-spacing-0 rounded-t border">
          <thead>
            <tr className="rounded-t">
              <td className="rounded-tl bg-gray-50 p-2 ">Token</td>
              <td className="rounded-tr bg-gray-50 p-2 ">Fallback</td>
            </tr>
          </thead>
          <tbody>
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
        {(open || !showMore) && (
          <div className="border-border-divider bg-surface-neutral-subtle relative w-full rounded-b border border-t-0 p-2">
            <button
              onClick={handleCopy}
              className="text-text-default hover:bg-surface-neutral-subtle-hover focus-visible:shadow-focus absolute top-2 right-2 rounded px-1 py-1 text-2xl focus:outline-none"
            >
              {active ? (
                <>
                  <SuccessStroke className="text-[1.5rem]" aria-hidden />
                  <span className="sr-only">Kopier formarterte tokens</span>
                </>
              ) : (
                <>
                  <CopyIcon aria-hidden role="img" />
                  <span className="sr-only">Kopier formarterte tokens</span>
                </>
              )}
            </button>
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
          className="text-medium group mx-auto flex shrink-0 -translate-y-3/4 flex-col items-center focus:outline-none"
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
