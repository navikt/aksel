import {
  BodyShort,
  Box,
  Detail,
  HStack,
  Heading,
  Hide,
  Show,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box
      as="header"
      borderWidth="0 0 4 0"
      borderColor="success"
      paddingBlock="space-48 space-0"
    >
      <Box
        maxWidth="64rem"
        paddingInline="space-16"
        paddingBlock="space-0 space-24"
      >
        <HStack align="start" gap="space-32">
          <Hide below="md">
            <Pictogram />
          </Hide>

          <VStack gap={{ xs: "space-16", md: "space-20" }}>
            <Heading level="1" size="xlarge">
              Dagpenger
            </Heading>

            <Hide below="md">
              <HStack gap="space-16" align="center">
                <BodyShort size="small">PENGESTØTTE</BodyShort>
                <span aria-hidden="true">|</span>
                <Detail>Oppdatert 5. juli 2023</Detail>
              </HStack>
            </Hide>
            <Show below="md">
              <VStack gap="space-8">
                <BodyShort size="small">PENGESTØTTE</BodyShort>
                <Detail>Oppdatert 24. august 2023</Detail>
              </VStack>
            </Show>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

function Pictogram() {
  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="80"
      height="80"
      viewBox="0 0 96.45 96.44"
    >
      <g clipPath="url(#clip0_4486_7567)">
        <path
          d="M37.6276 55.6806L12.707 30.76L31.2599 12.2071L56.1805 37.1277L66.7031 26.6052L75.0165 74.5166L27.1051 66.2031L37.6276 55.6806Z"
          fill="#CCF1D6"
        />
        <path d="M41 11V33H2L2 9H27.5072" stroke="#262626" strokeWidth="3" />
        <circle cx="22" cy="16" r="6.5" stroke="#262626" strokeWidth="3" />
        <circle cx="35" cy="9" r="6.5" stroke="#262626" strokeWidth="3" />
        <circle cx="62" cy="63" r="22.5" stroke="#262626" strokeWidth="3" />
        <path
          d="M77.8105 77.7964L94.9534 94.9392"
          stroke="#262626"
          strokeWidth="3"
        />
        <path
          d="M47.6311 59.1036L72.7452 52.3743C73.0119 52.3028 73.2861 52.4611 73.3576 52.7279L75.1693 59.4894C75.3837 60.2896 74.9088 61.1121 74.1086 61.3265L50.9264 67.5381C50.1262 67.7525 49.3037 67.2777 49.0893 66.4775L47.2776 59.716C47.2061 59.4493 47.3644 59.1751 47.6311 59.1036Z"
          stroke="#262626"
          strokeWidth="3"
        />
        <path
          d="M52.3847 74.912L50.4436 67.6676L74.5917 61.1971L76.5329 68.4416C76.7473 69.2418 76.2724 70.0643 75.4722 70.2787L54.2218 75.9727C53.4216 76.1871 52.5991 75.7122 52.3847 74.912Z"
          stroke="#262626"
          strokeWidth="3"
        />
        <path
          d="M64.1814 55.1864L63.6638 53.2546C63.092 51.1207 60.8987 49.8544 58.7648 50.4261V50.4261C56.631 50.9979 55.3646 53.1913 55.9364 55.3251L56.454 57.257"
          stroke="#262626"
          strokeWidth="3"
        />
      </g>
      <defs>
        <clipPath id="clip0_4486_7567">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "full",
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
  desc: "Box lar deg enklere bygge opp kjente grensesnitt gjennom felles tokens og brekkpunkt.",
};
