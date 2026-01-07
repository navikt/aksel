import { BoxNew, HStack } from "@navikt/ds-react";
import { GOD_PRAKSIS_TEMA_QUERY_RESULT } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { UmamiLink } from "@/app/_ui/umami/UmamiLink";
import { GodPraksisPictogram } from "./pictogram/GodPraksisPictogram";

type GpFrontpageCardProps = {
  children: React.ReactNode;
  href: string;
  image?: NonNullable<GOD_PRAKSIS_TEMA_QUERY_RESULT[number]["seo"]>["image"];
};

const GpFrontpageCard = ({ image, children, href }: GpFrontpageCardProps) => {
  const imageUrl = urlForImage(image)?.url();

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
          <svg
            aria-hidden
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.2636 17.7856L19.92 0.442043C19.3306 -0.147348 18.375 -0.147348 17.7856 0.442043L0.442044 17.7856C-0.147347 18.375 -0.147348 19.3306 0.442043 19.92L17.7856 37.2636C18.375 37.853 19.3306 37.853 19.92 37.2636L37.2636 19.92C37.853 19.3306 37.853 18.375 37.2636 17.7856Z"
              fill="var(--aksel-brand-teal-400)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.2452 16.4452C23.244 16.4464 23.2427 16.4476 23.2415 16.4489L14.8452 24.8452C14.1943 25.4961 13.139 25.4961 12.4882 24.8452C11.8373 24.1943 11.8373 23.139 12.4882 22.4882L21.0823 13.894C22.295 12.6813 23.9398 12 25.6549 12L45.5333 12C49.1048 12 52 14.8952 52 18.4667L52 38.3451C52 40.0602 51.3187 41.705 50.106 42.9177L41.5118 51.5118C40.861 52.1627 39.8057 52.1627 39.1548 51.5118C38.5039 50.861 38.5039 49.8057 39.1548 49.1548L47.5526 40.757C47.5534 40.7563 47.5541 40.7556 47.5548 40.7548C48.5976 39.712 48.5976 38.0213 47.5548 36.9785L27.0215 16.4452C25.9787 15.4024 24.288 15.4024 23.2452 16.4452ZM48.6667 33.3763L48.6667 18.4667C48.6667 16.7362 47.2638 15.3333 45.5333 15.3333L30.6237 15.3333L48.6667 33.3763ZM29.8452 34.1548C30.4961 34.8057 30.4961 35.861 29.8452 36.5119L14.8452 51.5119C14.1943 52.1627 13.139 52.1627 12.4882 51.5119C11.8373 50.861 11.8373 49.8057 12.4882 49.1548L27.4882 34.1548C28.139 33.504 29.1943 33.504 29.8452 34.1548Z"
              fill="var(--ax-neutral-1000)"
            />
          </svg>
        )}
      </BoxNew>
      <UmamiLink href={href} umamiKilde="God Praksis Forside">
        {children}
      </UmamiLink>
    </HStack>
  );
};

export { GpFrontpageCard };
