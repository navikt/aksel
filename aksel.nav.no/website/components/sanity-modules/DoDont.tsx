/* eslint-disable @next/next/no-img-element */
import { withErrorBoundary } from "@/error-boundary";
import { SanityT, urlFor } from "@/lib";
import { ErrorFilled, SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import cl from "clsx";
import React from "react";

const GetIcon = (s: string) => {
  switch (s) {
    case "do":
      return (
        <SuccessFilled
          aria-hidden
          className="text-large mt-[1px] flex-shrink-0 text-green-500"
        />
      );
    case "dont":
      return (
        <ErrorFilled
          aria-hidden
          className="text-large mt-[1px] flex-shrink-0 text-red-500"
        />
      );
    case "warning":
      return (
        <WarningFilled
          aria-hidden
          className="text-large mt-[1px] flex-shrink-0 text-orange-500"
        />
      );
    default:
      return null;
  }
};

const Element = ({
  block,
}: {
  block: Sanity.Keyed<SanityT.Schema.do_dont_block>;
}): JSX.Element => {
  if (!block.picture) return null;
  return (
    <figure
      className={cl(
        "flex min-w-full flex-1 flex-col rounded-t sm:min-w-[440px]",
        {
          "basis-full": block?.fullwidth,
          "max-w-sm": !block?.fullwidth,
        }
      )}
    >
      <img
        className="rounded-t bg-gray-50 shadow-[0_0_0_1px_var(--a-border-divider)]"
        alt={block.alt}
        loading="lazy"
        decoding="async"
        src={urlFor(block.picture).auto("format").url()}
      />
      <div
        className={cl(
          "z-10 -ml-[1px] w-[calc(100%_+_2px)] rounded-b border-t-8",
          {
            "border-t-green-400": block.variant === "do",
            "border-t-red-400": block.variant === "dont",
            "border-t-orange-500": block.variant === "warning",
          }
        )}
      />
      <figcaption data-variant={block.variant}>
        <div className="mt-3">
          {block.description && (
            <BodyShort size="small" as="span" className="inline-flex gap-2">
              {GetIcon(block.variant)}
              {block.description}
            </BodyShort>
          )}
        </div>
      </figcaption>
    </figure>
  );
};

const DoDont = ({ node }: { node: SanityT.Schema.do_dont }) => {
  if (!node) return null;

  return (
    <div className="mb-8 last:mb-0">
      {node?.blokker?.length > 0 && (
        <div className="last flex flex-wrap justify-start gap-8">
          {node.blokker.map((x) => (
            <Element key={x._key} block={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(DoDont, "DoDont");
