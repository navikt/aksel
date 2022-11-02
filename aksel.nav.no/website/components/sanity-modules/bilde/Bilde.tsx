/* eslint-disable @next/next/no-img-element */
import { BodyLong, Link } from "@navikt/ds-react";
import cl from "classnames";
import React from "react";
import { urlFor, SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import style from "./index.module.css";
import NextLink from "next/link";

const Bilde = ({
  node,
  className,
}: {
  node: SanityT.Schema.bilde;
  className?: string;
}): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  return (
    <>
      <figure
        className={cl("m-0 mb-8 flex flex-col", style.figure, className, {
          "sm:max-w-[384px]": node?.small,
        })}
      >
        <div className={cl(style.bilde, "flex justify-center bg-gray-50 p-0")}>
          <img
            alt={node.alt}
            decoding="async"
            src={urlFor(node).auto("format").url()}
            className={cl(style.bilde)}
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
                    <NextLink href={node.kilde.link} passHref>
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
    </>
  );
};

export default withErrorBoundary(Bilde, "Bilde");
