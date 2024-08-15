import { useId } from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import { Heading, Link } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

type AttachmentProps = {
  node: {
    title?: string;
    body?: any[];
    downloadLink: string;
    fileName: string;
    size: string;
  };
};

const Attachment = ({ node }: AttachmentProps) => {
  const id = useId();

  if (
    !node.body ||
    !node.title ||
    !node.downloadLink ||
    !node.fileName ||
    !node.size
  ) {
    return null;
  }

  const filetype = node.downloadLink.split(".").at(-1);

  return (
    <section
      aria-labelledby={id}
      className="mb-12 flex max-w-2xl gap-2 rounded-lg bg-pink-100 px-6 py-4 ring-1 ring-inset ring-pink-300"
    >
      <span className="-mt-[1px] grid h-[1.625rem] shrink-0 place-content-center text-2xl">
        <DownloadIcon aria-hidden />
      </span>
      <div>
        <Heading size="small" level="2" id={id} aria-hidden>
          {node.title}
        </Heading>
        <SanityBlockContent blocks={node.body} className="mt-2" />

        <Link
          href={`${node.downloadLink}?dl=${node.fileName}.${filetype}`}
          className="mt-2 text-lg text-blue-700"
          rel="noreferrer noopener"
          download={node.fileName}
        >
          {`${node.fileName}.${filetype} (${bytesToSize(parseInt(node.size))})`}
        </Link>
      </div>
    </section>
  );
};

/* https://gist.github.com/lanqy/5193417?permalink_comment_id=3874119 */
function bytesToSize(bytes: number) {
  const units = ["byte", "kilobyte", "megabyte"];
  const unit = Math.floor(Math.log(bytes) / Math.log(1024));
  return new Intl.NumberFormat("nb-NO", {
    style: "unit",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    roundingMode: "ceil",
    unit: units[unit],
  }).format(bytes / 1024 ** unit);
}

export default function Component(props: AttachmentProps) {
  return (
    <ErrorBoundary boundaryName="Attachment">
      <Attachment {...props} />
    </ErrorBoundary>
  );
}
