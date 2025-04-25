"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { VStack } from "@navikt/ds-react";
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
      {filteredTokens.length === 0 && <EmptyStateCard />}
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
  );
};

export default TokensPage;
