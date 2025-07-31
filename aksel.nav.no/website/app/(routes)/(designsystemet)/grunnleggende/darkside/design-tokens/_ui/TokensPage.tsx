"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { BodyShort, Link, VStack } from "@navikt/ds-react";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import TokenCategory from "./TokenCategory";
import { TOKEN_CATEGORIES } from "./config";
import { searchTokens } from "./toolbar/SearchField.utils";
import Toolbar from "./toolbar/Toolbar";

const TokensPage = () => {
  const searchParams = useSearchParams();
  const filteredTokens = searchTokens(searchParams?.get("tokenQuery") || "");
  const filteredCategories = TOKEN_CATEGORIES.filter(({ id }) =>
    filteredTokens.some((token) => token.category === id),
  );
  return (
    <VStack gap="space-8">
      <Toolbar />
      {filteredTokens.length === 0 && (
        <EmptyStateCard
          actionComponent={
            <BodyShort size="small">
              Hvis du mener at du burde fått treff på søket ditt, så send oss
              gjerne en feilmelding på{" "}
              <Link
                href={`https://github.com/navikt/aksel/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=token-missing.md&title=[Aksel.nav.no%20-%20Tokens%20-%20Ingen%20treff%20på%20%22${searchParams?.get(
                  "tokenQuery",
                )}%22]`}
                inlineText
              >
                GitHub
              </Link>{" "}
              eller{" "}
              <Link
                href="https://nav-it.slack.com/archives/C7NE7A8UF"
                inlineText
              >
                Slack
              </Link>
              .
            </BodyShort>
          }
        />
      )}
      <VStack gap="space-40">
        {filteredCategories.map(({ id, title, description, roles }) => {
          return (
            <TokenCategory
              id={id}
              key={id}
              title={title}
              description={description}
              roles={roles}
              tokens={filteredTokens.filter((token) => token.category === id)}
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

export default TokensPage;
