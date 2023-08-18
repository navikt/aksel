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

const getIcon = (s: string) => {
  switch (s) {
    case "do":
      return (
        <CheckmarkIcon
          aria-hidden
          fontSize="1.5rem"
          className="flex-shrink-0"
        />
      );
    case "dont":
      return (
        <XMarkIcon aria-hidden fontSize="1.5rem" className="flex-shrink-0" />
      );
    case "warning":
      return (
        <ExclamationmarkIcon
          aria-hidden
          fontSize="1.5rem"
          className="flex-shrink-0"
        />
      );
    default:
      return null;
  }
};

const getText = (s: string) => {
  switch (s) {
    case "do":
      return "Gjør";
    case "dont":
      return "Unngå";
    case "warning":
      return "Utfordrende";
    default:
      return "";
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
      <img
        className="ring-border-subtle rounded-t-lg bg-gray-50 ring-1"
        alt={block.alt}
        loading="lazy"
        decoding="async"
        src={urlFor(block.picture).auto("format").url()}
      />

      <figcaption data-variant={block.variant}>
        <div
          className={cl(
            "relative -ml-[1px] flex w-[calc(100%_+_2px)] items-center gap-1 rounded-b-lg px-2 py-1 text-white",
            {
              "bg-green-400": block.variant === "do",
              "bg-red-400": block.variant === "dont",
              "bg-orange-400": block.variant === "warning",
            }
          )}
          aria-hidden
        >
          <span>{getIcon(block.variant)}</span>
          <BodyShort size="small" as="span">
            {getText(block.variant)}
          </BodyShort>
        </div>
        <div className="mt-3">
          {block.description && (
            <BodyShort size="small" as="span">
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
