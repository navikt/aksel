import { useSearchParams } from "next/navigation";
import { Box, CopyButton, Detail, HGrid, VStack } from "@navikt/ds-react";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import { TokenForDocumentationT } from "../../../types/tokens";
import TokenPreview from "./TokenPreview";

const TokenEntry = ({
  index,
  token,
}: {
  index: number;
  token: TokenForDocumentationT;
}) => {
  const searchParams = useSearchParams();
  const tokenValue = searchParams?.get("tokenFormat");
  const tokenText = tokenValue ? token[tokenValue] : `--ax-${token.name}`;
  return (
    <Box.New
      borderWidth={`${index === 0 ? 1 : 0} 0 1`}
      borderColor="neutral-subtle"
      paddingBlock="space-16"
      paddingInline="space-8"
    >
      <HGrid gap="8" columns="min-content 1fr" align="center">
        <TokenPreview token={token} />
        <VStack align="start" gap="space-8">
          <VStack align="start">
            <CopyButton
              copyText={tokenText}
              text={tokenText}
              iconPosition="right"
              size="xsmall"
              style={{ marginInlineStart: "calc(-1 * var(--ax-space-8))" }}
            />
            {!["backgroundColor", "textColor", "borderColor"].includes(
              token.category,
            ) &&
              token.rawValue && (
                <Detail textColor="subtle">{token.rawValue}</Detail>
              )}
          </VStack>
          {token.comment && (
            <Detail>
              <TextWithMarkdown>{token.comment}</TextWithMarkdown>
            </Detail>
          )}
        </VStack>
      </HGrid>
    </Box.New>
  );
};

export default TokenEntry;
