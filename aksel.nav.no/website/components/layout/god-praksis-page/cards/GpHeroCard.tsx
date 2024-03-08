import cl from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";
import { HTMLAttributes, forwardRef } from "react";
import { BodyShort, Heading } from "@navikt/ds-react";
import { urlFor } from "@/sanity/interface";

type GpHeroCardProps = {
  children: React.ReactNode;
  href: string;
  articleCount?: number;
  image: any;
  compact?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

const GpHeroCard = forwardRef<HTMLAnchorElement, GpHeroCardProps>(
  ({ href, articleCount, children, image, compact = false, ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        href={`/${href}`}
        className="group flex gap-2 rounded-lg bg-surface-default py-2 pl-2 pr-3 shadow-xsmall outline-none hover:shadow-small focus-visible:shadow-focus md:gap-3 md:py-3 md:pl-3 md:pr-6"
        {...rest}
      >
        <div
          className={cl("relative my-auto shrink-0", {
            "size-8 md:size-12": !compact,
            "size-6": compact,
          })}
        >
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
            <FallbackImage />
          )}
        </div>

        <div className="grid gap-05">
          <Heading
            size="small"
            as="span"
            className="truncate text-aksel-heading underline group-hover:no-underline"
          >
            {children}
          </Heading>
          {articleCount && (
            <BodyShort
              as="span"
              size="small"
              textColor="subtle"
              className="uppercase"
            >{`${articleCount} ${
              articleCount === 1 ? "Artikkel" : "Artikler"
            }`}</BodyShort>
          )}
        </div>
      </Link>
    );
  },
);

function FallbackImage() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4376_826)">
        <rect
          x="14.25"
          width="20.6625"
          height="20.6625"
          rx="1.76601"
          transform="rotate(45 14.25 0)"
          fill="#99F6E4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.9835 10.9238L38.9205 16.7453L27.8505 30.2028L18.4766 34.4401L20.9189 24.374L31.9835 10.9238ZM22.984 25.4054L32.2776 14.1079L35.7675 17.0366L26.4459 28.3685L21.75 30.4912L22.984 25.4054Z"
          fill="#262626"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.8732 7.43541L34.9073 7.40063C36.5368 5.73522 39.2262 5.47011 41.0842 7.06044L41.1244 7.09484L41.3513 7.30836L41.3882 7.34644C43.03 9.04376 43.0583 11.719 41.5681 13.5305L38.0109 17.8515L31.074 12.0302L34.6618 7.67111L34.8732 7.43541ZM36.3686 9.13798L36.5155 8.97419C37.378 8.09268 38.7282 8.00555 39.6211 8.76981L39.771 8.91079C40.5762 9.74316 40.6324 11.1263 39.8305 12.1011L37.7174 14.6679L34.2275 11.7393L36.3686 9.13798Z"
          fill="#262626"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.2246 12.9243H26.25C26.8713 12.9243 27.375 12.4206 27.375 11.7993C27.375 11.178 26.8713 10.6743 26.25 10.6743H9.84961C8.81408 10.6743 7.97461 11.5138 7.97461 12.5493V41.716C7.97461 42.7515 8.81408 43.591 9.84961 43.591H35.9496C36.9851 43.591 37.8246 42.7515 37.8246 41.716V25.125C37.8246 24.5037 37.3209 24 36.6996 24C36.0783 24 35.5746 24.5037 35.5746 25.125V41.341H10.2246V12.9243Z"
          fill="#262626"
        />
      </g>
      <defs>
        <clipPath id="clip0_4376_826">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default GpHeroCard;
