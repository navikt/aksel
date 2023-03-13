import { withErrorBoundary } from "@/error-boundary";
import NextLink from "next/link";
import Image from "next/legacy/image";
import { logNav } from "@/utils";
import { SanityT, urlFor } from "@/lib";

interface AkselTemaT extends SanityT.Schema.aksel_tema {
  refCount: number;
}

const GodPraksisCardSimple = ({ node }: { node: Partial<AkselTemaT> }) => {
  if (!node?.pictogram || !node?.slug?.current || !node?.title) {
    return null;
  }

  return (
    <li className="flex items-center gap-4 px-6 py-4 shadow-[0_1px_0_0_var(--a-border-subtle)]">
      <div className="relative h-12 w-12">
        <Image
          src={urlFor(node?.pictogram).auto("format").url()}
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
          logNav(
            "card",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
        className="navds-heading--small navds-link text-deepblue-700 navds-heading no-underline hover:underline focus:outline-none"
      >
        {node.title}
      </NextLink>
    </li>
  );
};

export default withErrorBoundary(GodPraksisCardSimple, "GodPraksisCardSimple");
