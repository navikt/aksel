import { Image } from "sanity";
import { BoxNew, HStack } from "@navikt/ds-react";
import { GOD_PRAKSIS_TEMA_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { UmamiLink } from "@/app/_ui/umami/UmamiLink";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import { GodPraksisPictogram } from "./pictogram/GodPraksisPictogram";

type GpFrontpageCardProps = {
  children: React.ReactNode;
  href: string;
  image?: NonNullable<GOD_PRAKSIS_TEMA_QUERYResult[number]["seo"]>["image"];
};

const GpFrontpageCard = ({ image, children, href }: GpFrontpageCardProps) => {
  const imageUrl = urlForImage(image as Image)?.url();

  return (
    <HStack gap="space-8" paddingBlock="space-16" align="center" as="li">
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
