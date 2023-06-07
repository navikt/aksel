import { withErrorBoundary } from "@/error-boundary";
import { TokenTableT } from "@/types";
import { ChevronDownCircleIcon } from "@navikt/aksel-icons";
import core from "@navikt/ds-css/tokens.json";
import { BodyLong, CopyButton, Label, Link } from "@navikt/ds-react";
import cl from "classnames";
import { AkselTable, AkselTableRow } from "components/website-modules/Table";
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
        <AkselTable th={[{ text: "Token" }, { text: "Fallback" }]}>
          {Object.entries(tokens).map(([key, val]) => (
            <AkselTableRow key={key} tr={[{ text: key }, { text: val }]} />
          ))}
        </AkselTable>
        {(open || !showMore) && (
          <div className="border-border-subtle bg-surface-default relative -mt-8 w-full rounded-b border border-t-0 p-2 pr-14">
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
