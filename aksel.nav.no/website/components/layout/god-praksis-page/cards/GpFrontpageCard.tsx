import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/legacy/image";
import NextLink from "next/link";
import ErrorBoundary from "@/error-boundary";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import { urlFor } from "@/sanity/interface";

type GpFrontpageCardProps = {
  children: React.ReactNode;
  href: string;
  image?: SanityImageSource;
};

const GpFrontpageCard = ({ image, children, href }: GpFrontpageCardProps) => {
  const imageUrl = urlFor(image)?.auto("format").url();

  return (
    <li className="flex items-center gap-2 px-2 py-4 sm:gap-4 sm:px-6">
      <div className="relative h-8 w-8 shrink-0 sm:h-12 sm:w-12">
        {imageUrl ? (
          <Image
            src={imageUrl}
            decoding="sync"
            layout="fill"
            objectFit="contain"
            aria-hidden
            priority
          />
        ) : (
          <FallbackPictogram />
        )}
      </div>
      <NextLink
        href={href}
        passHref
        data-umami-event="navigere"
        data-umami-event-kilde="god praksis forside"
        className="navds-heading--small navds-link navds-heading flex-wrap break-all text-deepblue-700 no-underline hover:underline focus:outline-none"
      >
        {children}
      </NextLink>
    </li>
  );
};

export default function Component(props: GpFrontpageCardProps) {
  return (
    <ErrorBoundary boundaryName="GpFrontpageCard">
      <GpFrontpageCard {...props} />
    </ErrorBoundary>
  );
}
