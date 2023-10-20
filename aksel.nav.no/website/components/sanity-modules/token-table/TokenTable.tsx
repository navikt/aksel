import { withErrorBoundary } from "@/error-boundary";
import { TokenTableT } from "@/types";
import core from "@navikt/ds-css/tokens.json";
import { Bleed, BodyLong, CopyButton, Label, Link } from "@navikt/ds-react";
import { AkselTable, AkselTableRow } from "components/website-modules/Table";
import NextLink from "next/link";

import ShowMore from "./ShowMore";

const TokenTable = ({ node }: { node: TokenTableT }) => {
  const tokens: { [key: string]: string } | null =
    node.title in core ? core[node.title] : null;

  if (!tokens) {
    return null;
  }

  return (
    <div className="mb-7">
      <Bleed marginInline="4" marginBlock="4" asChild>
        <ShowMore as="section" aria-label="Proptabell" scrollBackOnCollapse>
          <AkselTable th={[{ text: "Token" }, { text: "Fallback" }]}>
            {Object.entries(tokens).map(([key, val]) => (
              <AkselTableRow key={key} tr={[{ text: key }, { text: val }]} />
            ))}
          </AkselTable>
          <div className="border-border-subtle bg-surface-default relative -mt-9 w-full rounded-b-lg border border-t-0 p-2 pr-14">
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
        </ShowMore>
      </Bleed>
    </div>
  );
};

export default withErrorBoundary(TokenTable, "Token-tabell");
