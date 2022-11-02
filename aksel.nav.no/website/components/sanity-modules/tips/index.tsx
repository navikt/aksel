import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Edit, LightBulb } from "@navikt/ds-icons";
import { Detail, Link } from "@navikt/ds-react";
import cl from "classnames";
import React from "react";
import style from "./tips.module.css";

const Tips = ({ node }: { node: SanityT.Schema.tips }): JSX.Element => {
  if (!node || !node.body) {
    return null;
  }

  if (node.eksperiment) {
    return (
      <div
        className={cl(
          style.tips,
          "linear xs:px-8 my-8 max-w-2xl rounded-r border-l-[6px] border-l-green-200 bg-white px-4 py-4"
        )}
      >
        <Detail
          className="text-text-muted flex items-center gap-1 font-semibold uppercase"
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
          className="svg-color-reset text-text mt-3 flex w-fit gap-2"
          onClick={() => {
            const el = document.getElementById("feedback-forbedringer-button");
            if (el) {
              el?.focus?.();
              el?.click?.();
            }
          }}
        >
          Send feedback
          <Edit
            aria-hidden
            aria-label="send inn feedback"
            className="text-base"
          />
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cl(
        style.tips,
        "xs:px-6 my-7 max-w-2xl px-4 py-3 shadow-[inset_5px_0_0_0_var(--navds-global-color-gray-500),inset_0_0_0_1px_var(--navds-global-color-gray-200)]"
      )}
    >
      <Detail
        className="override-text-no-max text-text-muted -ml-[2px] flex items-center gap-1 font-semibold"
        spacing
      >
        <LightBulb className="text-large" title="tips" aria-hidden />
        Tips
      </Detail>
      <SanityBlockContent blocks={node.body} noLastMargin size="small" />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
