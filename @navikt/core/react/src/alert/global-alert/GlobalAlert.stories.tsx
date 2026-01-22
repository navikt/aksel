import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import {
  GlobalAlert,
  GlobalAlertCloseButton,
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
    return (
      <GlobalAlert
        status={props.status ?? "announcement"}
        size={props.size}
        centered={props.centered}
      >
        <GlobalAlertHeader>
          <GlobalAlertTitle>
            {props.title ?? "GlobalAlert title"}
          </GlobalAlertTitle>
          <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
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
    status: "announcement",
    centered: true,
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
          <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
        </GlobalAlertHeader>
        <DemoContent />
      </GlobalAlert>
    );
  },
};

export const LeftAlignContent: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <GlobalAlert status="announcement" centered={false}>
          <GlobalAlertHeader>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
          <GlobalAlertContent>GlobalAlert content</GlobalAlertContent>
        </GlobalAlert>

        <GlobalAlert status="announcement" size="small" centered={false}>
          <GlobalAlertHeader>
            <GlobalAlertTitle>GlobalAlert Title</GlobalAlertTitle>
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
          <GlobalAlertContent>GlobalAlert content</GlobalAlertContent>
        </GlobalAlert>
      </VStack>
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
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
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
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
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
              <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
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
            <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
          </GlobalAlertHeader>
          <DemoContent />
        </GlobalAlert>
        <GlobalAlert status="announcement" size="small">
          <GlobalAlertHeader>
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
      <GlobalAlert status="announcement">
        <GlobalAlertHeader>
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

export const A11yTest: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(!open)}>Toggle open</Button>
        {open && (
          <GlobalAlert status="announcement">
            <GlobalAlertHeader>
              <GlobalAlertTitle>Alert title</GlobalAlertTitle>
              <GlobalAlertCloseButton onClick={() => alert("Lukket!")} />
            </GlobalAlertHeader>
            <DemoContent />
          </GlobalAlert>
        )}
      </div>
    );
  },
};

export const Centered: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <GlobalAlert status="announcement">
          <GlobalAlert.Header>
            <GlobalAlert.Title>
              Systemet vil være utilgjengelig natt til søndag (centered)
            </GlobalAlert.Title>
          </GlobalAlert.Header>
          <GlobalAlert.Content>
            Kunngjøringer brukes for å formidle noe om appen eller systemet,
            eller endringer som påvirker brukerne. Eksempelvis planlagt
            vedlikehold eller driftsmeldinger.
          </GlobalAlert.Content>
        </GlobalAlert>
        <GlobalAlert status="announcement" centered={false}>
          <GlobalAlert.Header>
            <GlobalAlert.Title>
              Systemet vil være utilgjengelig natt til søndag (not centered)
            </GlobalAlert.Title>
          </GlobalAlert.Header>
          <GlobalAlert.Content>
            Kunngjøringer brukes for å formidle noe om appen eller systemet,
            eller endringer som påvirker brukerne. Eksempelvis planlagt
            vedlikehold eller driftsmeldinger.
          </GlobalAlert.Content>
        </GlobalAlert>
      </VStack>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  LeftAlignContent,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CloseButton,
  WrappingTitle,
  Centered,
});

export const ChromaticDark = renderStoriesForChromatic({
  Default,
  LeftAlignContent,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CloseButton,
  WrappingTitle,
  Centered,
});
ChromaticDark.globals = { theme: "dark" };

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
