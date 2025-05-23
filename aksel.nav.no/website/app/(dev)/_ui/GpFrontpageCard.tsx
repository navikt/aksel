import NextLink from "next/link";
import { Image } from "sanity";
import { BoxNew, HStack, Link } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import styles from "./landingpage.module.css";
import { GodPraksisPictogram } from "./pictogram/GodPraksisPictogram";

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
  const imageUrl = urlForImage(image as Image)?.url();

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
          <GodPraksisPictogram url={imageUrl} />
        ) : (
          <FallbackPictogram />
        )}
      </BoxNew>

      <Link
        href={href}
        data-umami-event="navigere"
        data-umami-event-kilde="god praksis forside"
        className={styles.godPraksisCardItemLink}
        as={NextLink}
      >
        {children}
      </Link>
    </HStack>
  );
};

export default function Component(props: GpFrontpageCardProps) {
  return <GpFrontpageCard {...props} />;
}
