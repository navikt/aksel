import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { InformationSquareIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import {
  GlobalAlert,
  GlobalAlertCloseButton,
  GlobalAlertContent,
  GlobalAlertHeader,
  GlobalAlertTitle,
} from "./GlobalAlert";

const meta: Meta<typeof GlobalAlert> = {
  title: "ds-react/GlobalAlert",
  component: GlobalAlert,
  parameters: {
    chromatic: { disable: true },
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof GlobalAlert>;

export const Default: Story = {
  render: (props) => {
    return (
      <GlobalAlert variant={props.variant} size={props.size}>
        <GlobalAlertHeader icon={<InformationSquareIcon />}>
          <GlobalAlertTitle>
            {props.title ?? "GlobalAlert title"}
          </GlobalAlertTitle>
        </GlobalAlertHeader>
        <GlobalAlertContent>
          {props.children ?? "GlobalAlert content"}
        </GlobalAlertContent>
      </GlobalAlert>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    title: "GlobalAlert Title",
    size: "medium",
    variant: "success",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    variant: {
      control: { type: "select" },
      options: ["error", "warning", "success"],
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <GlobalAlert variant="success" size="small">
        <GlobalAlertHeader icon={<InformationSquareIcon />}>
          <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
          <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
        </GlobalAlertHeader>
        <DemoContent />
      </GlobalAlert>
    );
  },
};

export const OnlyHeader: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <GlobalAlert variant="success">
          <GlobalAlertHeader icon={<InformationSquareIcon />}>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
          </GlobalAlertHeader>
        </GlobalAlert>
        <GlobalAlert variant="success">
          <GlobalAlertHeader icon={<InformationSquareIcon />}>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
        </GlobalAlert>
      </VStack>
    );
  },
};

const variants = ["success", "warning", "error"] as const;

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {variants.map((variant) => (
          <GlobalAlert variant={variant} key={variant}>
            <GlobalAlertHeader icon={<InformationSquareIcon />}>
              <GlobalAlertTitle>Info: GlobalAlert title</GlobalAlertTitle>
            </GlobalAlertHeader>
            <DemoContent />
          </GlobalAlert>
        ))}
      </VStack>
    );
  },
};

export const CloseButton: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <GlobalAlert variant="success">
          <GlobalAlertHeader icon={<InformationSquareIcon />}>
            <GlobalAlertTitle>Info: GlobalAlert title</GlobalAlertTitle>
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
          <DemoContent />
        </GlobalAlert>
        <GlobalAlert variant="success" size="small">
          <GlobalAlertHeader icon={<InformationSquareIcon />}>
            <GlobalAlertTitle>Info: GlobalAlert title</GlobalAlertTitle>
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
          <DemoContent />
        </GlobalAlert>
      </VStack>
    );
  },
  parameters: {
    layout: "padded",
  },
};

export const WrappingTitle: Story = {
  render: () => {
    return (
      <GlobalAlert variant="success">
        <GlobalAlertHeader icon={<InformationSquareIcon />}>
          <GlobalAlertTitle>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugiat
            tempore corrupti asperiores praesentium? Asperiores, doloribus?
            Molestias, laudantium saepe. Nihil in alias praesentium maxime iure
            ipsam? Accusantium libero quia quis!
          </GlobalAlertTitle>
          <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
        </GlobalAlertHeader>
        <DemoContent />
      </GlobalAlert>
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
    <GlobalAlertContent>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure unde,
      repudiandae, deleniti exercitationem quod aut veniam sint officiis
      necessitatibus nulla nostrum voluptatem <Link href="#">Test</Link>
      facilis! Commodi, nobis tempora quibusdam temporibus nulla quam.{" "}
      <Button size="small">test</Button>
    </GlobalAlertContent>
  );
}
