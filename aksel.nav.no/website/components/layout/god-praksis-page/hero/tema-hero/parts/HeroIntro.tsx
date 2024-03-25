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
  if (!title) return null;
  return (
    <div className="relative z-10 mt-4" aria-hidden={hidden}>
      <div className="flex items-center gap-3">
        <div className="relative my-auto size-8 shrink-0 md:size-12">
          {image ? (
            <Image
              src={urlFor(image).auto("format").url()}
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
