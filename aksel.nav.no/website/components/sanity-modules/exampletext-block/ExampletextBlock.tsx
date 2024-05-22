import { useId } from "react";
import { BodyLong, CopyButton, HStack, Heading } from "@navikt/ds-react";
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
    <section
      aria-labelledby={id}
      className="mb-7 rounded-large bg-grayalpha-50 p-6 ring-1 ring-border-subtle last:mb-0 dark:bg-surface-neutral-moderate"
    >
      <HStack justify="space-between" gap="4" align="center" wrap={false}>
        <Heading size="small" as="p" textColor="subtle" id={id} aria-hidden>
          {node.title}
        </Heading>
        <CopyButton copyText={node.text} size="small" />
      </HStack>
      <hr className="my-4 border-border-subtle" aria-hidden />
      <div className="space-y-7">{formatText(node.text)}</div>
    </section>
  );
};

function formatText(text: string) {
  if (!text) return null;
  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => <BodyLong key={line}>{line}</BodyLong>);
}

export default function Component(props: ExampletextBlockProps) {
  return (
    <ErrorBoundary boundaryName="ExampletextBlock">
      <ExampletextBlock {...props} />
    </ErrorBoundary>
  );
}
