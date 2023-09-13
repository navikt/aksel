import {
  Box,
  Detail,
  HStack,
  Heading,
  BodyShort,
  Hide,
  Show,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Box
      as="header"
      background="surface-default"
      borderWidth="0 0 4 0"
      borderColor="border-warning"
    >
      <Box paddingInline="4" paddingBlock="0 6">
        <HStack align="start" gap="8">
          <Hide below="md">
            <Pictogram />
          </Hide>

          <VStack gap={{ xs: "4", md: "5" }}>
            <Heading level="1" size="xlarge">
              Er arbeidsledig eller permittert
            </Heading>

            <Hide below="md">
              <HStack gap="4" align="center">
                <BodyShort size="small">DETTE KAN DU HA RETT TIL</BodyShort>
                <span aria-hidden="true">|</span>
                <Detail>Oppdatert 5. juli 2023</Detail>
              </HStack>
            </Hide>
            <Show below="md">
              <VStack gap="2">
                <BodyShort size="small">DETTE KAN DU HA RETT TIL</BodyShort>
                <Detail>Oppdatert 5. juli 2023</Detail>
              </VStack>
            </Show>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "subtle",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
  desc: "Box lar deg enklere bygge opp kjente grensesnitt gjennom felles tokens og brekkpunkt",
};

function Pictogram() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g clipPath="url(#clip0_275_1062)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48 24C34.7452 24 24 34.7452 24 48C24 61.2548 34.7452 72 48 72C61.2548 72 72 61.2548 72 48C72 34.7452 61.2548 24 48 24ZM16 48C16 30.3269 30.3269 16 48 16C65.6731 16 80 30.3269 80 48C80 65.6731 65.6731 80 48 80C30.3269 80 16 65.6731 16 48Z"
          fill="#FFECCC"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.3284 30.8284L30.8284 70.3284L25.1716 64.6716L64.6716 25.1716L70.3284 30.8284Z"
          fill="#FFECCC"
        />
        <path
          d="M50 26.7059H94M62.2222 11.8824V6.94118C62.2222 4.21224 64.4111 2 67.1111 2H76.8889C79.5889 2 81.7778 4.21224 81.7778 6.94118V11.8824M72 26.7059V34.1176M52 44H92C93.1046 44 94 43.1046 94 42V13.8824C94 12.7778 93.1046 11.8824 92 11.8824H52C50.8954 11.8824 50 12.7778 50 13.8824V42C50 43.1046 50.8954 44 52 44Z"
          stroke="#262626"
          strokeWidth="3"
        />
        <path
          d="M2 58.6316H48V94H2V58.6316Z"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 58.5L21 48"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M48 58.5L29 48"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M29 69H21"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_275_1062">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
