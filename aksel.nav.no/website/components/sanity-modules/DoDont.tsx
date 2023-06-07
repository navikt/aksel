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

const GetIcon = (s: string) => {
  switch (s) {
    case "do":
      return (
        <CheckmarkIcon
          aria-hidden
          fontSize="2rem"
          className="flex-shrink-0 text-green-500"
        />
      );
    case "dont":
      return (
        <XMarkIcon
          aria-hidden
          fontSize="2rem"
          className="flex-shrink-0 text-red-500"
        />
      );
    case "warning":
      return (
        <ExclamationmarkIcon
          aria-hidden
          fontSize="2rem"
          className="flex-shrink-0 text-orange-500"
        />
      );
    default:
      return null;
  }
};

const Element = ({ block }: { block: DoDontT["blokker"][number] }) => {
  if (!block.picture) return null;
  return (
    <figure
      className={cl("sm:min-w-80 flex min-w-full flex-1 flex-col", {
        "basis-full": block?.fullwidth,
        "max-w-sm": !block?.fullwidth,
      })}
    >
      <div
        className={cl(
          "relative z-10 -ml-[1px] w-[calc(100%_+_2px)] border-t-4",
          {
            "border-t-border-success": block.variant === "do",
            "border-t-border-danger": block.variant === "dont",
            "border-t-surface-warning": block.variant === "warning",
          }
        )}
        aria-hidden
      >
        <span className="absolute left-[10px] z-10 translate-y-2">
          {GetIcon(block.variant)}
        </span>
      </div>
      <img
        className="ring-border-subtle  bg-gray-50 ring-1"
        alt={block.alt}
        loading="lazy"
        decoding="async"
        src={urlFor(block.picture).auto("format").url()}
      />
      <figcaption data-variant={block.variant}>
        <div className="mt-3">
          {block.description && (
            <BodyShort
              size="small"
              as="span"
              className="inline-flex items-center gap-2"
            >
              {block.description}
            </BodyShort>
          )}
        </div>
      </figcaption>
    </figure>
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

export default withErrorBoundary(DoDont, "DoDont");
