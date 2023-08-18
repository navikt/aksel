import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { TipsT } from "@/types";
import { LightBulbIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";

const Tips = ({ node }: { node: TipsT }) => {
  if (!node || !node.body) {
    return null;
  }

  return (
    <div className="ring-deepblue-300 bg-deepblue-50 my-7 max-w-2xl rounded-lg p-4 ring-1 sm:p-6">
      <Heading
        className="override-text-no-max text-deepblue-700 -ml-[2px] flex items-center gap-1"
        size="small"
        as="p"
        spacing
      >
        <LightBulbIcon fontSize="1.5rem" title="tips" aria-hidden />
        Tips
      </Heading>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
