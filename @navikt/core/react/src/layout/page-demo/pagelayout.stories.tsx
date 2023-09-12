import { LinkIcon } from "@navikt/aksel-icons";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  BodyLong,
  Box,
  ContentBox,
  CopyButton,
  HGrid,
  Heading,
  Hide,
  Link,
  Show,
  VStack,
} from "../..";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AvatarPanel } from "./AvatarPanel";
import "./styling.css";

const meta = {
  title: "PageDemo/navno",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  render: () => {
    return (
      <div>
        <Header />
        <Box
          style={{ minHeight: "calc(100vh - 10rem)" }}
          background="surface-subtle"
          paddingBlock="12 0"
        >
          <ContentBox maxWidth="lg">
            <Box paddingInline="4">
              <HGrid
                align="start"
                columns={{ xs: 1, md: "288px minmax(auto,600px)" }}
                gap={{ xs: "3", md: "6" }}
              >
                <Box style={{ position: "sticky", top: "1rem" }}>
                  <Show above="md">
                    <Sidebar />
                  </Show>
                </Box>

                <VStack gap={{ xs: "6", md: "12" }}>
                  <ContentFirst />
                  <Hide above="md">
                    <Sidebar />
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
      </div>
    );
  },
};

function ContentFirst() {
  return (
    <AvatarPanel>
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
    </AvatarPanel>
  );
}

function ContentLast() {
  return (
    <AvatarPanel>
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
    </AvatarPanel>
  );
}
