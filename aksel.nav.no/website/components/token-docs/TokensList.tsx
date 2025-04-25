import TokenEntry from "./token/example/TokenEntry";
import { TokenForDocumentationT } from "./types";

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
