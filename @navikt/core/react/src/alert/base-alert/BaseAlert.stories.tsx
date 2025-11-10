import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import {
  Root as BaseAlert,
  Close as BaseAlertClose,
  Content as BaseAlertContent,
  Header as BaseAlertHeader,
  Title as BaseAlertTitle,
} from "./namespace";

const meta: Meta<typeof BaseAlert> = {
  title: "ds-react/Alert/BaseAlert",
  component: BaseAlert,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof BaseAlert>;

export const Default: Story = {
  render: (props) => {
    return (
      <div>
        <BaseAlert
          {...props}
          status={props.status ?? "success"}
          size={props.size}
        >
          <BaseAlertHeader>
            <BaseAlertTitle>{props.title ?? "BaseAlert title"}</BaseAlertTitle>
            <BaseAlertClose onClick={() => alert("Lukket!")} />
          </BaseAlertHeader>
          <BaseAlertContent>
            {props.children ?? "BaseAlert content"}
          </BaseAlertContent>
        </BaseAlert>
      </div>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    title: "BaseAlert Title",
    size: "medium",
    status: "success",
    type: "strong",
    statusType: "alert",
    global: false,
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    status: {
      control: { type: "select" },
      options: ["error", "warning", "success", "announcement"],
    },
    type: {
      control: { type: "radio" },
      options: ["strong", "moderate"],
    },
    statusType: {
      control: { type: "radio" },
      options: ["alert", "message"],
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <BaseAlert
        status="success"
        size="small"
        type="strong"
        statusType="message"
      >
        <BaseAlertHeader>
          <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
          <BaseAlertClose onClick={() => alert("Lukket!")} />
        </BaseAlertHeader>
        <DemoContent />
      </BaseAlert>
    );
  },
};

export const Strong: Story = {
  render: () => {
    return (
      <BaseAlert
        status="success"
        size="small"
        type="strong"
        statusType="message"
      >
        <BaseAlertHeader>
          <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
        </BaseAlertHeader>
        <DemoContent />
      </BaseAlert>
    );
  },
};

export const Moderate: Story = {
  render: () => {
    return (
      <BaseAlert status="success" type="moderate" statusType="message">
        <BaseAlertHeader>
          <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
        </BaseAlertHeader>
        <DemoContent />
      </BaseAlert>
    );
  },
};

export const OnlyHeader: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <BaseAlert status="success" type="strong" statusType="message">
          <BaseAlertHeader>
            <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
          </BaseAlertHeader>
        </BaseAlert>
        <BaseAlert status="success" type="strong" statusType="message">
          <BaseAlertHeader>
            <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
            <BaseAlertClose onClick={() => alert("Lukket!")} />
          </BaseAlertHeader>
        </BaseAlert>
        <BaseAlert
          status="success"
          size="small"
          type="strong"
          statusType="message"
        >
          <BaseAlertHeader>
            <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
          </BaseAlertHeader>
        </BaseAlert>
        <BaseAlert
          status="success"
          size="small"
          type="strong"
          statusType="message"
        >
          <BaseAlertHeader>
            <BaseAlertTitle>BaseAlert Title</BaseAlertTitle>
            <BaseAlertClose onClick={() => alert("Lukket!")} />
          </BaseAlertHeader>
        </BaseAlert>
      </VStack>
    );
  },
};

export const CloseButton: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <BaseAlert status="success" type="strong" statusType="message">
          <BaseAlertHeader>
            <BaseAlertTitle>Info: BaseAlert title</BaseAlertTitle>
            <BaseAlertClose onClick={() => alert("Lukket!")} />
          </BaseAlertHeader>
          <DemoContent />
        </BaseAlert>
        <BaseAlert
          status="success"
          size="small"
          type="strong"
          statusType="message"
        >
          <BaseAlertHeader>
            <BaseAlertTitle>Info: BaseAlert title</BaseAlertTitle>
            <BaseAlertClose onClick={() => alert("Lukket!")} />
          </BaseAlertHeader>
          <DemoContent />
        </BaseAlert>
      </VStack>
    );
  },
};

export const WrappingTitle: Story = {
  render: () => {
    return (
      <BaseAlert status="success" type="strong" statusType="message">
        <BaseAlertHeader>
          <BaseAlertTitle>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugiat
            tempore corrupti asperiores praesentium? Asperiores, doloribus?
            Molestias, laudantium saepe. Nihil in alias praesentium maxime iure
            ipsam? Accusantium libero quia quis!
          </BaseAlertTitle>
          <BaseAlertClose onClick={() => alert("Lukket!")} />
        </BaseAlertHeader>
        <DemoContent />
      </BaseAlert>
    );
  },
};

function DemoContent() {
  return (
    <BaseAlertContent>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure unde,
      repudiandae, deleniti exercitationem quod aut veniam sint officiis
      necessitatibus nulla nostrum voluptatem <Link href="#">Test</Link>
      facilis! Commodi, nobis tempora quibusdam temporibus nulla quam.{" "}
      <Button size="small">test</Button>
    </BaseAlertContent>
  );
}
