"use client";

import React from "react";
import { HGrid, VStack } from "@navikt/ds-react";
import { tokens as tokenDocs } from "@navikt/ds-tokens/token_docs";
import TokenCategory from "./TokenCategory";
import { TOKEN_CATEGORIES } from "./config";
import Toolbar from "./toolbar/Toolbar";

const TokensPage = () => {
  const [searchData, setSearchData] = React.useState<{
    query: string;
    tokenType: "css" | "js";
  }>({
    query: "",
    tokenType: "css",
  });

  const filteredTokens = tokenDocs.filter((token) => {
    const stringifiedToken = JSON.stringify(token);
    const searchQuery = searchData.query.toLowerCase();
    return stringifiedToken.includes(searchQuery);
  });

  const filteredCategories = Object.entries(TOKEN_CATEGORIES).filter(
    ([category]) => filteredTokens.some((token) => token.category === category),
  );
  return (
    <HGrid columns="auto 15rem" as="main" gap="10">
      <VStack gap="10">
        <Toolbar onSearch={setSearchData} />
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
    </HGrid>
  );
};

export default TokensPage;
