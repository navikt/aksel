import ErrorBoundary from "@/error-boundary";
import { amplitudeLogNavigation } from "@/logging";
import { urlFor } from "@/sanity/interface";
import { AkselTemaT } from "@/types";
import Image from "next/legacy/image";
import NextLink from "next/link";

type GodPraksisCardSimpleProps = {
  node: Partial<AkselTemaT>;
};

const GodPraksisCardSimple = ({ node }: GodPraksisCardSimpleProps) => {
  if (!node?.pictogram || !node?.slug?.current || !node?.title) {
    return null;
  }

  return (
    <li className="flex items-center gap-2 px-2 py-4 sm:gap-4 sm:px-6">
      <div className="relative h-8 w-8 shrink-0 sm:h-12 sm:w-12">
        <Image
          src={urlFor(node?.pictogram)
            .auto("format")
            .url()}
          decoding="sync"
          layout="fill"
          objectFit="contain"
          aria-hidden
          priority
        />
      </div>
      <NextLink
        href={`/god-praksis/${node.slug.current}`}
        passHref
        onClick={(e) =>
          amplitudeLogNavigation("card", e.currentTarget.getAttribute("href"))
        }
        className="navds-heading--small navds-link navds-heading flex-wrap break-all text-deepblue-700 no-underline hover:underline focus:outline-none"
      >
        {node.title}
      </NextLink>
    </li>
  );
};

export default function Component(props: GodPraksisCardSimpleProps) {
  return (
    <ErrorBoundary boundaryName="GodPraksisCardSimple">
      <GodPraksisCardSimple {...props} />
    </ErrorBoundary>
  );
}
