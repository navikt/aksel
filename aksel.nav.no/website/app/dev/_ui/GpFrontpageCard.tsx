"use client";

import Image from "next/image";
import NextLink from "next/link";
import { urlForImage } from "@/app/_sanity/utils";
import ErrorBoundary from "@/error-boundary";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";

// NOTE: could perhaps avoid this "repeated type" we already get
// from the sanity query results type? (send type down from parent
// to this component somehow?)
type GpFrontpageCardProps = {
  children: React.ReactNode;
  href: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    alt?: string;
    _type: "image";
  };
};

const GpFrontpageCard = ({ image, children, href }: GpFrontpageCardProps) => {
  const imageUrl = urlForImage(image)?.auto("format").url();

  return (
    <li className="flex items-center gap-2 px-2 py-4 sm:gap-4 sm:px-6">
      <div className="relative h-8 w-8 shrink-0 sm:h-12 sm:w-12">
        {imageUrl ? (
          <Image
            alt={image?.alt ?? ""}
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
