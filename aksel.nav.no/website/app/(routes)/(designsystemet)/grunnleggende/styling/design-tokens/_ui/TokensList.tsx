import type { TokenDocT } from "@navikt/ds-tokens/token_docs";
import TokenEntry from "./token/example/TokenEntry";

const TokensList = ({ tokens }: { tokens: TokenDocT[] }) => {
  return (
    <ul>
      {tokens.map((token, index) => (
        <li key={token.name}>
          <TokenEntry token={token} index={index} />
        </li>
      ))}
    </ul>
  );
};

export default TokensList;
