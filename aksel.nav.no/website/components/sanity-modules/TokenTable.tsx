import { SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";

const TokenTable = ({ node }: { node: SanityT.Schema.token_kategori }) => {
  return <div>hello</div>;
};

export default withErrorBoundary(TokenTable, "Token-tabell");
