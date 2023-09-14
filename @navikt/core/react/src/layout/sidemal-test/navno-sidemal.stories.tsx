import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box, HGrid, Hide, Show, VStack } from "../..";
import { Content } from "./Content";
import { FilterCard } from "./Filter";
import { Header } from "./Header";
import { IntroCard } from "./Intro";
import { Sidebar } from "./Sidebar";
import "./styling.css";
import { ContentBox } from "./content-box";

const meta = {
  title: "kitchen sink/navno-sidemal",
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
                columns={{
                  xs: "minmax(auto, 600px)",
                  md: "288px minmax(auto, 600px)",
                }}
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
                  <Content />
                  <Content />
                  <Content />
                  <Content />
                </VStack>
              </HGrid>
            </Box>
          </ContentBox>
        </Box>
      </div>
    );
  },
};
