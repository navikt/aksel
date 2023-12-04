import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Heading, VStack } from "@navikt/ds-react";

function Hero() {
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline="10"
      paddingBlock="10 6"
      className="bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100 relative overflow-clip pointer-events-none"
    >
      <VStack gap="6" align="start" className="z-10 relative">
        <Heading
          size="xlarge"
          as="button"
          className="py-2 pl-6 pr-4 text-aksel-heading bg-surface-subtle flex gap-2 items-center rounded-full shadow-xsmall"
        >
          Alle tema{" "}
          <ChevronDownIcon aria-hidden className="shrink-0 w-12 h-12" />
        </Heading>
        <BodyLong>
          Alle som jobber med produktutvikling i NAV sitter på kunnskap og
          erfaring som er nyttig for andre. Derfor deler vi god praksis med
          hverandre her.
        </BodyLong>
      </VStack>
      <Cube />
    </Box>
  );
}

function Cube() {
  return (
    <svg
      width="720"
      height="240"
      viewBox="0 0 720 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1329.81 -664C1330.61 -664 1331.37 -663.684 1331.93 -663.122L2078.12 85.3978C2079.29 86.5681 2079.29 88.4656 2078.12 89.6359L1331.93 838.156C1331.37 838.718 1330.61 839.034 1329.82 839.034C1329.02 839.034 1328.26 838.718 1327.7 838.156L581.505 89.6359C580.945 89.0739 580.63 88.3116 580.63 87.5168C580.63 86.722 580.945 85.9598 581.505 85.3978L1327.7 -663.122C1328.26 -663.684 1329.02 -664 1329.81 -664ZM1329.81 -656.765L587.842 87.5168L1329.82 831.799L2071.79 87.5168L1329.81 -656.765ZM130.185 -208.034C130.977 -208.034 131.737 -207.718 132.297 -207.156L878.495 541.364C879.662 542.534 879.662 544.432 878.495 545.602L132.298 1294.12C131.737 1294.68 130.977 1295 130.185 1295C129.393 1295 128.633 1294.68 128.073 1294.12L-618.125 545.602C-619.292 544.432 -619.292 542.534 -618.125 541.364L128.073 -207.156C128.633 -207.718 129.393 -208.034 130.185 -208.034ZM-611.788 543.483L130.185 1287.77L872.158 543.483L130.185 -200.799L-611.788 543.483Z"
        fill="#E6F1F8"
      />
    </svg>
  );
}

export default Hero;
