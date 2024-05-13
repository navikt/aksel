import { useId } from "react";
import { BodyLong, Box, CopyButton, HStack, Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";

type ExampletextBlockProps = {
  node: {
    title: string;
    text: string;
  };
};

const ExampletextBlock = ({ node }: ExampletextBlockProps) => {
  const id = useId();

  if (!node.text || !node.title) return null;

  return (
    <Box
      as="section"
      background="surface-subtle"
      padding="6"
      aria-labelledby={id}
      className="mb-7 last:mb-0 dark:bg-surface-neutral-moderate"
      borderRadius="large"
    >
      <HStack justify="space-between" gap="4" align="center" wrap={false}>
        <Heading size="small" as="p" textColor="subtle" id={id} aria-hidden>
          {node.title}
        </Heading>
        <CopyButton copyText={node.text} size="small" />
      </HStack>
      <hr className="my-4 border-border-subtle" aria-hidden />
      <div className="space-y-7">{formatText(node.text)}</div>
    </Box>
  );
};

function formatText(text: string) {
  if (!text) return null;
  return text
    .split("\n")
    .filter(Boolean)
    .map((line, index) => <BodyLong key={index}>{line}</BodyLong>);
}

export default function Component(props: ExampletextBlockProps) {
  return (
    <ErrorBoundary boundaryName="ExampletextBlock">
      <ExampletextBlock {...props} />
    </ErrorBoundary>
  );
}
