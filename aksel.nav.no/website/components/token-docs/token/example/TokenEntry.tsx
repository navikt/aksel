import { Box, CopyButton, Detail, HStack, VStack } from "@navikt/ds-react";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import TokenPreview from "./TokenPreview";

const TokenEntry = ({ index, token }: { index: number; token: any }) => {
  const tokenText = `--ax-${token.name}`;
  return (
    <Box
      borderWidth={`${index === 0 ? 1 : 0} 0 1`}
      borderColor="border-subtle"
      paddingBlock="4"
      paddingInline="2"
    >
      <HStack gap="3">
        <TokenPreview token={token} />
        <VStack align="start" gap="2">
          <VStack align="start">
            <CopyButton
              copyText={tokenText}
              text={tokenText}
              iconPosition="right"
              size="xsmall"
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
      </HStack>
    </Box>
  );
};

export default TokenEntry;
