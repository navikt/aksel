"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../types/tokens";
import TokenCategory from "./TokenCategory";
import { TOKEN_CATEGORIES } from "./config";
import Toolbar from "./toolbar/Toolbar";

const TokensPage = ({ tokens }: { tokens: TokenForDocumentationT[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query");
  const filteredTokens = tokens.filter((token) => {
    const stringifiedToken = JSON.stringify(token);
    const searchQuery = query?.toLowerCase();
    return !searchQuery || stringifiedToken.includes(searchQuery);
  });

  const filteredCategories = Object.entries(TOKEN_CATEGORIES).filter(
    ([category]) => filteredTokens.some((token) => token.category === category),
  );
  return (
    <VStack gap="10">
      <Toolbar />
      {filteredCategories.map(([key, category]) => {
        const { title, description } = category;
        const roles = "roles" in category ? category.roles : undefined;
        return (
          <TokenCategory
            id={key}
            key={key}
            title={title}
            description={description}
            roles={roles}
            tokens={filteredTokens.filter((token) => token.category === key)}
          />
        );
      })}
    </VStack>
  );
};

export default TokensPage;
