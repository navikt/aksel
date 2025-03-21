/* eslint-disable @next/next/no-img-element */
import cl from "clsx";
import NextLink from "next/link";
import { BodyLong, Link } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { urlFor } from "@/sanity/interface";
import { BildeT } from "@/types";

type BildeProps = {
  node: BildeT;
  className?: string;
};

const Bilde = ({ node, className }: BildeProps) => {
  const imageUrl = urlFor(node)?.auto("format").url();

  if (!node || !node.asset || !imageUrl) {
    return null;
  }

  return (
    <figure
      className={cl(
        "m-0 mb-8 flex flex-col group-[.aksel-artikkel]/aksel:mx-auto",
        className,
        {
          "md:max-w-text": node?.small,
        },
      )}
    >
      <div
        style={
          node?.background
            ? {
                backgroundColor: `rgba(${node.background.rgb.r},${node.background.rgb.g},${node.background.rgb.b},${node.background.rgb.a})`,
              }
            : { backgroundColor: "var(--a-gray-50)" }
        }
        className={cl("flex justify-center rounded-lg p-0", {
          "ring-1 ring-border-subtle": node.border,
        })}
      >
        <img
          alt={!node?.dekorativt ? node.alt : ""}
          decoding="async"
          src={imageUrl}
          className="rounded-lg"
        />
      </div>
      {node.caption && (
        <figcaption className="mt-2 grid gap-1 px-4">
          <BodyLong as="span" size="small" className="self-center">
            {node.caption}
          </BodyLong>
          {node?.kilde?.har_kilde && (
            <BodyLong as="span" size="small" className="self-center">
              {node?.kilde?.link ? (
                <>
                  {`${node?.kilde?.prefix}: `}
                  <NextLink href={node.kilde.link} passHref legacyBehavior>
                    <Link className="break-normal">{node?.kilde?.tekst}</Link>
                  </NextLink>
                </>
              ) : (
                <>{`${node?.kilde?.prefix}: ${node?.kilde?.tekst}`}</>
              )}
            </BodyLong>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default function Component(props: BildeProps) {
  return (
    <ErrorBoundary boundaryName="Bilde">
      <Bilde {...props} />
    </ErrorBoundary>
  );
}
