import Image from "next/legacy/image";
import { BodyLong, Heading } from "@navikt/ds-react";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import { urlFor } from "@/sanity/interface";

type HeroIntroProps = {
  title?: string;
  description?: string;
  hidden?: boolean;
  image?: any;
};

export function HeroIntro({
  title,
  description,
  hidden,
  image,
}: HeroIntroProps) {
  const imageUrl = urlFor(image)?.auto("format").url();

  return (
    <div className="relative z-10 mt-4" aria-hidden={hidden}>
      <div className="flex items-center gap-3">
        {/* To avoid having duplicate images for different backgrounds, we up the contrast instead */}
        <div className="relative my-auto size-8 shrink-0 contrast-200 md:size-12">
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
        <Heading level="1" size="xlarge" className="z-10">
          {title}
        </Heading>
      </div>
      {description && (
        <BodyLong
          size="large"
          className="relative z-10 mt-4 rounded-xlarge backdrop-blur-[1px]"
        >
          {description}
        </BodyLong>
      )}
    </div>
  );
}
