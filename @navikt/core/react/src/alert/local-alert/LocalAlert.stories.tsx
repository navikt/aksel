import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import {
  LocalAlert,
  LocalAlertCloseButton,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
} from "./index";

const meta: Meta<typeof LocalAlert> = {
  title: "ds-react/Alert/LocalAlert",
  component: LocalAlert,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof LocalAlert>;

export const Default: Story = {
  render: (props) => {
    return (
      <LocalAlert status={props.status ?? "announcement"} size={props.size}>
        <LocalAlertHeader>
          <LocalAlertTitle>{props.title ?? "LocalAlert title"}</LocalAlertTitle>
          <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
        </LocalAlertHeader>
        <LocalAlertContent>
          {props.children ?? "LocalAlert content"}
        </LocalAlertContent>
      </LocalAlert>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    title: "LocalAlert Title",
    size: "medium",
    status: "announcement",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    status: {
      control: { type: "select" },
      options: ["error", "warning", "announcement", "success"],
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <LocalAlert status="announcement" size="small">
        <LocalAlertHeader>
          <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
          <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
        </LocalAlertHeader>
        <DemoContent />
      </LocalAlert>
    );
  },
};

export const OnlyHeader: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <LocalAlert status="announcement">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
          </LocalAlertHeader>
        </LocalAlert>
        <LocalAlert status="announcement">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
        </LocalAlert>
        <LocalAlert status="announcement" size="small">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
          </LocalAlertHeader>
        </LocalAlert>
        <LocalAlert status="announcement" size="small">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
        </LocalAlert>
      </VStack>
    );
  },
};

const statuss = ["announcement", "warning", "error", "success"] as const;

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {statuss.map((status) => (
          <LocalAlert status={status} key={status}>
            <LocalAlertHeader>
              <LocalAlertTitle>{status} LocalAlert title</LocalAlertTitle>
              <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
            </LocalAlertHeader>
            <DemoContent />
          </LocalAlert>
        ))}
      </VStack>
    );
  },
};

export const CloseButton: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <LocalAlert status="announcement">
          <LocalAlertHeader>
            <LocalAlertTitle>Info: LocalAlert title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
          <DemoContent />
        </LocalAlert>
        <LocalAlert status="announcement" size="small">
          <LocalAlertHeader>
            <LocalAlertTitle>Info: LocalAlert title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
          <DemoContent />
        </LocalAlert>
      </VStack>
    );
  },
};

export const WrappingTitle: Story = {
  render: () => {
    return (
      <LocalAlert status="announcement">
        <LocalAlertHeader>
          <LocalAlertTitle>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugiat
            tempore corrupti asperiores praesentium? Asperiores, doloribus?
            Molestias, laudantium saepe. Nihil in alias praesentium maxime iure
            ipsam? Accusantium libero quia quis!
          </LocalAlertTitle>
          <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
        </LocalAlertHeader>
        <DemoContent />
      </LocalAlert>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CloseButton,
  WrappingTitle,
});

export const ChromaticDark = renderStoriesForChromatic({
  Default,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CloseButton,
  WrappingTitle,
});
ChromaticDark.globals = { theme: "dark" };

function DemoContent() {
  return (
    <LocalAlertContent>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure unde,
      repudiandae, deleniti exercitationem quod aut veniam sint officiis
      necessitatibus nulla nostrum voluptatem <Link href="#">Test</Link>
      facilis! Commodi, nobis tempora quibusdam temporibus nulla quam.{" "}
      <Button size="small">test</Button>
    </LocalAlertContent>
  );
}
