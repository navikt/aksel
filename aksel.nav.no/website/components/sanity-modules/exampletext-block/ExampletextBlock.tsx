import { useId } from "react";
import { CopyButton, HStack, Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";

type ExampletextBlockProps = {
  node: {
    title?: string;
    text?: string;
    readMore?: boolean;
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
    </section>
  );
};

export default function Component(props: ExampletextBlockProps) {
  return (
    <ErrorBoundary boundaryName="ExampletextBlock">
      <ExampletextBlock {...props} />
    </ErrorBoundary>
  );
}
