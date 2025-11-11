import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import {
  GlobalAlert,
  GlobalAlertClose,
  GlobalAlertContent,
  GlobalAlertHeader,
  GlobalAlertTitle,
} from "./index";

const meta: Meta<typeof GlobalAlert> = {
  title: "ds-react/Alert/GlobalAlert",
  component: GlobalAlert,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof GlobalAlert>;

export const Default: Story = {
  render: (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(!open)}>toggle</Button>
        {open && (
          <GlobalAlert
            status={props.status ?? "announcement"}
            size={props.size}
          >
            <GlobalAlertHeader>
              <GlobalAlertTitle>
                {props.title ?? "GlobalAlert title"}
              </GlobalAlertTitle>
              <GlobalAlertClose onClick={() => alert("Lukket!")} />
            </GlobalAlertHeader>
            <GlobalAlertContent>
              {props.children ?? "GlobalAlert content"}
            </GlobalAlertContent>
          </GlobalAlert>
        )}
      </div>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    title: "GlobalAlert Title",
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
      <GlobalAlert status="announcement" size="small">
        <GlobalAlertHeader>
          <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
          <GlobalAlertClose onClick={() => alert("Lukket!")} />
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
        <GlobalAlert status="announcement">
          <GlobalAlertHeader>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
          </GlobalAlertHeader>
        </GlobalAlert>
        <GlobalAlert status="announcement">
          <GlobalAlertHeader>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
            <GlobalAlertClose onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
        </GlobalAlert>
        <GlobalAlert status="announcement" size="small">
          <GlobalAlertHeader>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
          </GlobalAlertHeader>
        </GlobalAlert>
        <GlobalAlert status="announcement" size="small">
          <GlobalAlertHeader>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
            <GlobalAlertClose onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
        </GlobalAlert>
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
          <GlobalAlert status={status} key={status}>
            <GlobalAlertHeader>
              <GlobalAlertTitle>{status} GlobalAlert title</GlobalAlertTitle>
              <GlobalAlertClose onClick={() => alert("Lukket!")} />
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
        <GlobalAlert status="announcement">
          <GlobalAlertHeader>
            <GlobalAlertTitle>Info: GlobalAlert title</GlobalAlertTitle>
            <GlobalAlertClose onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
          <DemoContent />
        </GlobalAlert>
        <GlobalAlert status="announcement" size="small">
          <GlobalAlertHeader>
            <GlobalAlertTitle>Info: GlobalAlert title</GlobalAlertTitle>
            <GlobalAlertClose onClick={() => alert("Lukket!")} />
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
      <GlobalAlert status="announcement">
        <GlobalAlertHeader>
          <GlobalAlertTitle>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugiat
            tempore corrupti asperiores praesentium? Asperiores, doloribus?
            Molestias, laudantium saepe. Nihil in alias praesentium maxime iure
            ipsam? Accusantium libero quia quis!
          </GlobalAlertTitle>
          <GlobalAlertClose onClick={() => alert("Lukket!")} />
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

export const ChromaticLight = renderStoriesForChromatic({
  Default,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CloseButton,
  WrappingTitle,
});
ChromaticLight.globals = { theme: "light", mode: "darkside" };

export const ChromaticDark = renderStoriesForChromatic({
  Default,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CloseButton,
  WrappingTitle,
});
ChromaticDark.globals = { theme: "dark", mode: "darkside" };

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
