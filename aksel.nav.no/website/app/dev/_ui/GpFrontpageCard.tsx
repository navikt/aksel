"use client";

import Image from "next/image";
import NextLink from "next/link";
import { BoxNew, HStack } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import ErrorBoundary from "@/error-boundary";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import styles from "./landingpage.module.css";

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
    <HStack
      gap="space-8"
      paddingInline={{ xs: "space-8", sm: "space-24" }}
      paddingBlock="space-16"
      align="center"
    >
      <BoxNew
        position="relative"
        flexShrink="0"
        width={{ xs: "32px", sm: "48px" }}
        height={{ xs: "32px", sm: "48px" }}
      >
        {imageUrl ? (
          <Image
            alt={image?.alt ?? ""}
            src={imageUrl}
            decoding="sync"
            layout="fill"
            objectFit="contain"
            aria-hidden
            className={styles.godPraksisCardItemImage}
            priority
          />
        ) : (
          <FallbackPictogram />
        )}
      </BoxNew>
      <NextLink
        href={href}
        passHref
        data-umami-event="navigere"
        data-umami-event-kilde="god praksis forside"
        className={styles.godPraksisCardItemLink}
      >
        {children}
      </NextLink>
    </HStack>
  );
};

export default function Component(props: GpFrontpageCardProps) {
  return (
    <ErrorBoundary boundaryName="GpFrontpageCard">
      <GpFrontpageCard {...props} />
    </ErrorBoundary>
  );
}
