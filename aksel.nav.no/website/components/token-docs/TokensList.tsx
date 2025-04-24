import { TokenForDocumentationT } from "../types/tokens";
import TokenEntry from "./token/example/TokenEntry";

const TokensList = ({ tokens }: { tokens: TokenForDocumentationT[] }) => {
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
