import NextLink from "next/link";
import { Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { InnholdsKortPrinsipperT } from "@/types";

type InnholdsKortProps = {
  node: InnholdsKortPrinsipperT;
};

const InnholdsKort = ({ node }: InnholdsKortProps) => {
  if (!node.title || !node.body || !node.lenke) {
    return null;
  }

  return (
    <article className="group relative mb-7 rounded-lg bg-white p-4 shadow-xsmall last-of-type:mb-18 focus-within:ring focus-within:ring-border-focus hover:shadow-small sm:p-8">
      <Heading
        spacing
        size="small"
        level="3"
        id={node._key}
        className="scroll-mt-28 text-deepblue-500 underline focus:outline-none group-hover:no-underline"
      >
        <NextLink
          href={`/${node?.lenke}`}
          passHref
          data-umami-event="navigere"
          data-umami-event-kilde="innholdskort"
          className="z-10 before:absolute before:inset-0 focus:outline-none"
        >
          {node.title}
        </NextLink>
      </Heading>
      <SanityBlockContent blocks={node.body} />
    </article>
  );
};

export default function Component(props: InnholdsKortProps) {
  return (
    <ErrorBoundary boundaryName="InnholdsKort">
      <InnholdsKort {...props} />
    </ErrorBoundary>
  );
}
