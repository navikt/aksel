"use client";

import { useSearchParams } from "next/navigation";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { TOKEN_CATEGORIES } from "./config";
import { searchTokens } from "./toolbar/SearchField.utils";

const TokenTableOfContents = () => {
  const searchParams = useSearchParams();
  const filteredTokens = searchTokens(searchParams?.get("tokenQuery") || "");
  const toc = TOKEN_CATEGORIES.filter((category) =>
    filteredTokens.some((token) => token.category === category.id),
  );
  return (
    <TableOfContents
      feedback={{
        name: "Tokens darkside",
        text: "Send innspill",
      }}
      toc={toc}
    />
  );
};

export default TokenTableOfContents;
