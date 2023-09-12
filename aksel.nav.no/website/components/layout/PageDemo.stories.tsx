import { LinkIcon, PersonIcon } from "@navikt/aksel-icons";
import {
  Box,
  HStack,
  Hide,
  VStack,
  Heading,
  BodyShort,
  Detail,
  Show,
  ContentBox,
  Bleed,
  HGrid,
  Label,
  CopyButton,
  BodyLong,
  Link,
} from "@navikt/ds-react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "PageDemo/navno",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  render: () => {
    return (
      <Box paddingBlock="4 0" style={{ position: "relative" }}>
        <Box borderWidth="0 0 4 0" borderColor="border-warning">
          <ContentBox style={{ maxWidth: "67.5rem" }}>
            <Header />
          </ContentBox>
        </Box>
        <Box
          style={{ minHeight: "calc(100vh - 10rem)" }}
          background="surface-subtle"
          paddingBlock="12 0"
        >
          <ContentBox style={{ maxWidth: "67.5rem" }}>
            <Box paddingInline="4">
              <HGrid
                align="start"
                columns={{ xs: 1, md: "288px minmax(auto,600px)" }}
                gap={{ xs: "3", md: "6" }}
              >
                <Box style={{ position: "sticky", top: "1rem" }}>
                  <Show above="md">
                    <VStack gap="4">
                      <DesktopSidebar />
                      <DesktopSidebar2 />
                    </VStack>
                  </Show>
                </Box>

                <VStack gap={{ xs: "6", md: "12" }}>
                  <ContentFirst />
                  <Hide above="md">
                    <VStack gap="4">
                      <DesktopSidebar />
                      <DesktopSidebar2 />
                    </VStack>
                  </Hide>
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                  <ContentLast />
                </VStack>
              </HGrid>
            </Box>
          </ContentBox>
        </Box>
      </Box>
    );
  },
};

function Header() {
  return (
    <Box as="header" background="surface-default">
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
}

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

const LinkElement = ({ children }) => {
  return (
    <Label
      as="li"
      className="text-text-action hover:bg-surface-action-subtle hover:text-text-default cursor-pointer px-4 py-3 hover:underline"
    >
      {children}
    </Label>
  );
};

function DesktopSidebar() {
  return (
    <Box paddingInline="1" paddingBlock="8 4" background="surface-default">
      <Box paddingBlock="0 2" paddingInline="4 0">
        <Heading size="medium" className="leading-heading-xlarge">
          Innhold
        </Heading>
      </Box>
      <nav aria-label="innhold">
        <ul>
          <LinkElement>Hvem kan få?</LinkElement>
          <LinkElement>Hvor lenge?</LinkElement>
          <LinkElement>Hvor mye penger kan du få?</LinkElement>
          <LinkElement>Når utbetales pengene?</LinkElement>
        </ul>
      </nav>
    </Box>
  );
}

const MobileSidebar = () => <DesktopSidebar />;

function DesktopSidebar2() {
  return (
    <Box paddingInline="1" paddingBlock="8 4" background="surface-default">
      <Box paddingBlock="0 2" paddingInline="4 0">
        <Heading size="small" className="leading-heading-xlarge">
          Nyttig å vite
        </Heading>
      </Box>
      <nav aria-label="innhold">
        <VStack as="ul" gap="3">
          <Box paddingInline="4">
            <Link href="#">
              Hva sier forskriften om tiltakspenger? (lovdata.no)
            </Link>
          </Box>
          <Box paddingInline="4">
            <Link href="#">
              Hva sier rundskrivet om tiltakspenger og tilleggsstønader?
              (lovdata.no)
            </Link>
          </Box>
        </VStack>
      </nav>
    </Box>
  );
}

function ContentFirst() {
  return (
    <GuidePanelBox>
      <VStack gap="6">
        <VStack gap="2" align="start">
          <Heading size="large">Kort om tiltakspenger</Heading>
          <CopyButton
            copyText="#"
            text="Kopier lenke"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </VStack>
        <BodyLong>
          Når du deltar i et arbeidsmarkedstiltak, kan du ha rett til
          tiltakspenger.
        </BodyLong>
      </VStack>
    </GuidePanelBox>
  );
}

function ContentLast() {
  return (
    <GuidePanelBox>
      <VStack gap="6">
        <VStack gap="2" align="start">
          <Heading size="large">Hvor lenge?</Heading>
          <CopyButton
            copyText="#"
            text="Kopier lenke"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </VStack>
        <BodyLong>
          Det er i utgangspunktet ikke tidsbegrensing for hvor lenge man kan få
          pleiepenger, så lenge vilkårene for å få pleiepenger er oppfylt.
        </BodyLong>
        <BodyLong>
          Det er egne regler hvis man oppholder seg utenfor EØS,{" "}
          <Link href="#">les mer om dette her.</Link>
        </BodyLong>
      </VStack>
    </GuidePanelBox>
  );
}

const GuidePanelBox = () => {
  return (
    <>
      <style>
        {`

        .guide-panel-box {

          position: relative;

        }

        .avatar-circle {

          width: 4rem;

          height: 4rem;

          position: absolute;

          top: -2rem;

        }

      `}
      </style>

      <Box
        background="bg-default"
        padding="5"
        paddingBlock="10 3"
        className="guide-panel-box"
      >
        <HStack justify="center">
          <Box
            className="avatar-circle"
            borderRadius="full"
            padding="3"
            background="surface-success-subtle"
          >
            <PersonIcon fontSize={40} />
          </Box>
        </HStack>

        <Heading size="medium">Hei, Navn Navnesen</Heading>

        <BodyLong>
          Dette er en guidepanelbox som bruker Box, HStack og ting og tang
        </BodyLong>
      </Box>
    </>
  );
};
