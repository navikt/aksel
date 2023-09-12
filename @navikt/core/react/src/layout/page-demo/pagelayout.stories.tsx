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
  List,
  Show,
  VStack,
} from "../..";
import { AvatarPanel } from "./AvatarPanel";
import { FilterCard } from "./Filter";
import { Header } from "./Header";
import { IntroCard } from "./Intro";
import { Sidebar } from "./Sidebar";
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
                columns={{ xs: 1, md: "288px minmax(auto, 600px)" }}
                gap={{ xs: "3", md: "6" }}
              >
                <Box style={{ position: "sticky", top: "1rem" }}>
                  <Show above="md">
                    <Sidebar />
                  </Show>
                </Box>

                <VStack gap={{ xs: "6", md: "8" }}>
                  <IntroCard />
                  <FilterCard />
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

function ContentLast() {
  return (
    <AvatarPanel>
      <Box paddingBlock="0 6">
        <VStack gap="2" align="start">
          <Heading size="large">Hvem kan få?</Heading>
          <CopyButton
            copyText="#"
            text="Kopier lenke"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </VStack>
      </Box>
      <BodyLong weight="semibold">
        Har du blitt arbeidsledig eller permittert, kan du få dagpenger fra NAV
        hvis alt dette gjelder for deg:
      </BodyLong>
      <List>
        <List.Item>
          Du har mistet minst 50 prosent av den totale arbeidstiden din.
        </List.Item>
        <List.Item>
          Du har fått inntekten din helt eller delvis redusert.
        </List.Item>
        <List.Item>
          Du har hatt en inntekt på minst 177 930 kroner (1,5 G - Grunnbeløp) de
          siste 12 månedene, eller minst 355 860 kroner (3 G) de siste 36
          månedene.
        </List.Item>
        <List.Item>Du er under 67 år.</List.Item>
      </List>
    </AvatarPanel>
  );
}
