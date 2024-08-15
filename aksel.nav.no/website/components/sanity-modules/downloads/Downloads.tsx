import { useId } from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import { HStack, Heading, Link } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

type DownloadsBlockProps = {
  node: {
    title?: string;
    content?: any[];
    downloadLink: string;
    fileName: string;
  };
};

const DownloadsBlock = ({ node }: DownloadsBlockProps) => {
  const id = useId();

  if (!node.content || !node.title || !node.downloadLink || !node.fileName) {
    return null;
  }

  return (
    <section
      aria-labelledby={id}
      className="mb-7 rounded-large bg-grayalpha-50 p-6 ring-1 ring-border-subtle last:mb-0 dark:bg-surface-neutral-moderate"
    >
      <Heading
        size="small"
        as="p"
        id={id}
        aria-hidden
        spacing
        className="override-text-no-max -ml-[2px] flex items-center gap-1 text-text-subtle"
      >
        <div className="h-[1.625rem]">
          <DownloadIcon fontSize="1.5rem" aria-hidden />
        </div>
        {node.title}
      </Heading>
      <SanityBlockContent blocks={node.content} />
      <HStack gap="4" className="mt-4">
        <Link className="text-xl" href="#">
          {`${node.fileName} (4KB)`}
        </Link>
      </HStack>
    </section>
  );
};

export default function Component(props: DownloadsBlockProps) {
  return (
    <ErrorBoundary boundaryName="DownloadsBlock">
      <DownloadsBlock {...props} />
    </ErrorBoundary>
  );
}
