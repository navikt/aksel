"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { VStack } from "@navikt/ds-react";
import TokenCategory from "./TokenCategory";
import { TOKEN_CATEGORIES } from "./config";
import { searchTokens } from "./toolbar/SearchField.utils";
import Toolbar from "./toolbar/Toolbar";

const TokensPage = () => {
  const searchParams = useSearchParams();
  const filteredTokens = searchTokens(searchParams?.get("tokenQuery") || "");

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
