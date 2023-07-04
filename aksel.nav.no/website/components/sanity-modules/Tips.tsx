import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { TipsT } from "@/types";
import { LightBulbIcon, PencilIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail, Link } from "@navikt/ds-react";

const Tips = ({ node }: { node: TipsT }) => {
  if (!node || !node.body) {
    return null;
  }

  if (node.eksperiment) {
    return (
      <div className="linear my-8 max-w-2xl rounded-r border-l-[6px] border-l-green-200 bg-white px-4 py-4 sm:px-8">
        <Detail
          className="text-text-subtle flex items-center gap-1 font-semibold uppercase"
          spacing
        >
          <svg
            focusable="false"
            className="text-2xl"
            aria-label="tips"
            aria-hidden
            height="1em"
            width="1em"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 6h-2v5.33L6 18h12l-5-6.67z"
              className="fill-green-200/30"
            />
            <path
              className="fill-green-300"
              d="M20.8 18.4 15 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H8.04c-.42 0-.65.48-.39.81L9 6.5v4.17L3.2 18.4c-.49.66-.02 1.6.8 1.6h16c.82 0 1.29-.94.8-1.6zM6 18l5-6.67V6h2v5.33L18 18H6z"
            />
          </svg>
          Hjelp ønskes
        </Detail>
        <SanityBlockContent blocks={node.body} noLastMargin />
        <Link
          as="button"
          className="svg-color-reset text-text-default mt-3 flex w-fit gap-2"
          onClick={() => {
            const el = document.getElementById("feedback-forbedringer-button");
            if (el) {
              el?.focus?.();
              el?.click?.();
            }
          }}
        >
          Send feedback
          <PencilIcon
            aria-hidden
            aria-label="send inn feedback"
            fontSize="1.5rem"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="border-l-deepblue-500 bg-deepblue-50 my-7 max-w-2xl border-l-4 px-4 py-3 sm:px-6">
      <BodyShort
        className="override-text-no-max text-deepblue-800 -ml-[2px] flex items-center gap-1 font-semibold"
        spacing
        size="small"
      >
        <LightBulbIcon fontSize="1.5rem" title="tips" aria-hidden />
        Tips
      </BodyShort>
      <SanityBlockContent blocks={node.body} noLastMargin size="small" />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
