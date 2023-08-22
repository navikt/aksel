/* eslint-disable @next/next/no-img-element */
import { withErrorBoundary } from "@/error-boundary";
import { urlFor } from "@/sanity/interface";
import { DoDontT } from "@/types";
import {
  CheckmarkIcon,
  ExclamationmarkIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { BodyShort } from "@navikt/ds-react";
import cl from "clsx";

const Element = ({ block }: { block: DoDontT["blokker"][number] }) => {
  if (!block.picture) {
    return null;
  }

  return (
    <BodyShort
      as="figure"
      className={cl("sm:min-w-80 flex min-w-full flex-1 flex-col", {
        "basis-full": block?.fullwidth,
        "max-w-sm": !block?.fullwidth,
      })}
    >
      <div className="shadow-xsmall ring-border-subtle relative rounded-lg ring-1 ring-inset ">
        <BodyShort
          size="small"
          as="span"
          className={cl(
            "relative z-[-1] flex items-center gap-1 rounded-t-lg px-2 py-1",
            {
              "bg-surface-success-moderate": block.variant === "do",
              "bg-surface-danger-moderate": block.variant === "dont",
              "bg-surface-warning-moderate": block.variant === "warning",
            }
          )}
          aria-hidden
        >
          <span>{getIcon(block.variant)}</span>
          <span>{getText(block.variant)}</span>
        </BodyShort>
        <img
          className="relative z-[-1] rounded-b-lg bg-gray-50"
          alt={block.alt}
          loading="lazy"
          decoding="async"
          src={urlFor(block.picture).auto("format").url()}
        />
      </div>
      {block.description && (
        <figcaption className="mt-2 px-2">{block.description}</figcaption>
      )}
    </BodyShort>
  );
};

const DoDont = ({ node }: { node: DoDontT }) => {
  if (!node) return null;

  return (
    <div className="mb-8 last:mb-0">
      {node?.blokker?.length > 0 && (
        <div className="last flex flex-wrap justify-start gap-6">
          {node.blokker.map((x) => (
            <Element key={x._key} block={x} />
          ))}
        </div>
      )}
    </div>
  );
};

function getIcon(s: string) {
  const iconProps = {
    "aria-hidden": true,
    fontSize: "1.25rem",
    className: "flex-shrink-0",
  };

  switch (s) {
    case "do":
      return <CheckmarkIcon {...iconProps} />;
    case "dont":
      return <XMarkIcon {...iconProps} />;
    case "warning":
      return <ExclamationmarkIcon {...iconProps} />;
    default:
      return null;
  }
}

function getText(s: string) {
  switch (s) {
    case "do":
      return "Gjør";
    case "dont":
      return "Unngå";
    case "warning":
      return "Pass på";
    default:
      return "";
  }
}

export default withErrorBoundary(DoDont, "DoDont");
