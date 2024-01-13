import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { TipsT } from "@/types";
import { LightBulbIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";

type TipsProps = { node: TipsT };

const Tips = ({ node }: TipsProps) => {
  if (!node || !node.body) {
    return null;
  }

  return (
    <div className="link-color-override my-7 max-w-2xl rounded-lg bg-surface-alt-3-subtle p-4 ring-1 ring-inset ring-border-subtle sm:p-6">
      <Heading
        className="override-text-no-max -ml-[2px] flex items-center gap-1 text-icon-alt-3"
        size="small"
        as="p"
        spacing
      >
        <LightBulbIcon fontSize="1.5rem" title="tips" aria-hidden />
        Tips
      </Heading>
      <SanityBlockContent blocks={node.body} />
    </div>
  );
};

export default function Component(props: TipsProps) {
  return (
    <ErrorBoundary boundaryName="Tips">
      <Tips {...props} />
    </ErrorBoundary>
  );
}
