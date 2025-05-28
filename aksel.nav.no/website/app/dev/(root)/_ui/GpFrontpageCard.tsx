import { Image } from "sanity";
import { BoxNew, HStack } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import { UmamiLink } from "../../_ui/UmamiLink";
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
      as="li"
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
      <UmamiLink href={href} umamiKilde="God Praksis Forside">
        {children}
      </UmamiLink>
    </HStack>
  );
};

export { GpFrontpageCard };
