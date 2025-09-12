import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import {
  LocalAlert,
  LocalAlertCloseButton,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
} from "./LocalAlert";

const meta: Meta<typeof LocalAlert> = {
  title: "ds-react/LocalAlert",
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
      <LocalAlert variant={props.variant ?? "announcement"} size={props.size}>
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
    variant: "announcement",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    variant: {
      control: { type: "select" },
      options: ["error", "warning", "announcement", "success"],
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <LocalAlert variant="announcement" size="small">
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
        <LocalAlert variant="announcement">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
          </LocalAlertHeader>
        </LocalAlert>
        <LocalAlert variant="announcement">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
        </LocalAlert>
        <LocalAlert variant="announcement" size="small">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
          </LocalAlertHeader>
        </LocalAlert>
        <LocalAlert variant="announcement" size="small">
          <LocalAlertHeader>
            <LocalAlertTitle>LocalAlert Title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
        </LocalAlert>
      </VStack>
    );
  },
};

const variants = ["announcement", "warning", "error", "success"] as const;

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {variants.map((variant) => (
          <LocalAlert variant={variant} key={variant}>
            <LocalAlertHeader>
              <LocalAlertTitle>{variant} LocalAlert title</LocalAlertTitle>
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
        <LocalAlert variant="announcement">
          <LocalAlertHeader>
            <LocalAlertTitle>Info: LocalAlert title</LocalAlertTitle>
            <LocalAlertCloseButton onClick={() => alert("Lukket!")} />
          </LocalAlertHeader>
          <DemoContent />
        </LocalAlert>
        <LocalAlert variant="announcement" size="small">
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
      <LocalAlert variant="announcement">
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
