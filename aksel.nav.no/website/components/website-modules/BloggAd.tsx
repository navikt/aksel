import { Heading, BodyLong, Link } from "@navikt/ds-react";
import NextLink from "next/link";

const CubeLarge = () => (
  <svg
    width="1016"
    height="320"
    viewBox="0 0 1016 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute right-0 z-0 hidden lg:block"
    aria-hidden
  >
    <path
      d="M849.229 637.344L1096.48 390.09L849.228 142.836L601.975 390.09L849.229 637.344Z"
      stroke="#F9A8D4"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
    <path
      d="M872.671 119.393L1119.93 -127.861H873.041L625.787 119.393H872.671Z"
      stroke="#F9A8D4"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
  </svg>
);

const CubeSmall = () => (
  <svg
    className="pointer-events-none absolute left-0 z-0 max-w-full overflow-hidden lg:hidden"
    width="390"
    height="290"
    viewBox="0 0 390 290"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M-0.327544 508.393L246.927 261.139H0.0431418L-247.212 508.393H-0.327544Z"
      stroke="#F9A8D4"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
    <path
      d="M517.621 -9.55799L764.876 237.697L517.992 237.697L270.737 -9.55799H517.621Z"
      stroke="#F9A8D4"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
  </svg>
);

export const BloggAd = () => {
  return (
    <div className="full-bleed my-20 flex h-72 items-center bg-[#FBCFE8] px-4 md:rounded-2xl md:px-6 lg:h-80 lg:pl-12">
      <div className="z-10 max-w-sm text-[#831843]">
        <Heading level="2" size="xlarge" spacing>
          Skriv for bloggen
        </Heading>

        <BodyLong spacing>
          Brenner du for digital produktutvikling, og har en #FFC0E6-blogger i
          magen?
        </BodyLong>
        <BodyLong>
          Ta kontakt med{" "}
          <NextLink
            href="https://nav-it.slack.com/archives/C7NE7A8UF"
            passHref
            legacyBehavior
          >
            <Link className="font-semibold text-[#831843]">
              #Aksel-designsystemet
            </Link>
          </NextLink>{" "}
          på Slack
        </BodyLong>
      </div>
      <CubeLarge />
      <CubeSmall />
    </div>
  );
};
