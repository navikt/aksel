/* eslint-disable @next/next/no-img-element */
import { withErrorBoundary } from "@/error-boundary";
import { DsFrontPageCardT, urlFor } from "@/lib";
import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav } from "../..";

interface CardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  node: DsFrontPageCardT;
  tag?: boolean;
}

const Card = ({ node, tag, href, className, ...rest }: CardProps) => {
  return (
    <div
      className={cl(
        "group relative flex aspect-[21/22] w-[18rem] flex-col rounded bg-white p-6 pt-8 text-text shadow-small ring-1 ring-gray-900/10 focus-within:outline-none hover:shadow-medium  active:text-link lg:aspect-[18/22] lg:p-8 lg:pt-12",
        className
      )}
    >
      <div className="mb-6 flex shrink-0 justify-center lg:w-full">
        <img
          aria-hidden
          alt={node?.picture?.title}
          loading="eager"
          src={urlFor(node?.picture).auto("format").url()}
        />
      </div>
      <NextLink href={href ?? `/${node?.link_ref?.slug}`} passHref>
        <a
          onClick={(e) =>
            logNav(
              "card",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="navds-heading--medium navds-heading navds-typo--spacing no-underline after:absolute after:inset-0 after:rounded focus:outline-none focus-visible:after:shadow-focus group-hover:underline"
          {...rest}
        >
          {node.title}
        </a>
      </NextLink>
      <BodyShort className={cl("mb-2 lg:mb-6")} data-tag={!!tag}>
        {node.content}
      </BodyShort>
    </div>
  );
};

export default withErrorBoundary(Card, "Card");
