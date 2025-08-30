import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ExclamationmarkTriangleFillIcon,
  LinkIcon,
  ThumbDownFillIcon,
  ThumbUpFillIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { Spacer, VStack } from "../layout/stack";
import InfoCard, {
  InfoCardCollapsibleContent,
  InfoCardContent,
  InfoCardExpandButton,
  InfoCardHeader,
  InfoCardTitle,
} from "./InfoCard";

const meta: Meta<typeof InfoCard> = {
  title: "ds-react/InfoCard",
  component: InfoCard,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {
  render: (props) => {
    return (
      <InfoCard data-color={props["data-color"]} size={props.size}>
        <InfoCardHeader>
          <InfoCardTitle>{props.title}</InfoCardTitle>
        </InfoCardHeader>
        <InfoCardContent>{props.children}</InfoCardContent>
      </InfoCard>
    );
  },

  args: {
    children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
    title: "InfoCard Title",
    size: "medium",
    "data-color": "info",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    "data-color": {
      control: { type: "select" },
      options: [
        "info",
        "danger",
        "warning",
        "success",
        "brand-magenta",
        "meta-purple",
      ],
    },
  },
};

export const SizeSmall: Story = {
  render: () => {
    return (
      <InfoCard size="small">
        <InfoCardHeader>
          <InfoCardTitle>InfoCard Title</InfoCardTitle>
        </InfoCardHeader>
        <DemoContent />
      </InfoCard>
    );
  },
};

export const OnlyHeader: Story = {
  render: () => {
    return (
      <InfoCard>
        <InfoCardHeader>
          <InfoCardTitle>InfoCard Title</InfoCardTitle>
        </InfoCardHeader>
      </InfoCard>
    );
  },
};

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        <InfoCard data-color="info">
          <InfoCardHeader>
            <InfoCardTitle>Info: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="success">
          <InfoCardHeader icon={<ThumbUpFillIcon />}>
            <InfoCardTitle>Gjør dette: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="brand-magenta">
          <InfoCardHeader icon={<ThumbDownFillIcon />}>
            <InfoCardTitle>Unngå dette: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="warning">
          <InfoCardHeader icon={<ExclamationmarkTriangleFillIcon />}>
            <InfoCardTitle>Pass på: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="neutral">
          <InfoCardHeader icon={<LinkIcon />}>
            <InfoCardTitle>Lenker: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
      </VStack>
    );
  },
};

export const CustomHeader: Story = {
  render: () => {
    return (
      <InfoCard>
        <InfoCardHeader>
          <InfoCardTitle>Info: InfoCard title</InfoCardTitle>
          <Spacer />
          <Button
            icon={<XMarkIcon aria-hidden />}
            data-color="neutral"
            variant="tertiary"
            size="small"
          />
        </InfoCardHeader>
        <DemoContent />
      </InfoCard>
    );
  },
};

export const WrappingTitle: Story = {
  render: () => {
    return (
      <InfoCard>
        <InfoCardHeader>
          <InfoCardTitle>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugiat
            tempore corrupti asperiores praesentium? Asperiores, doloribus?
            Molestias, laudantium saepe. Nihil in alias praesentium maxime iure
            ipsam? Accusantium libero quia quis!
          </InfoCardTitle>
        </InfoCardHeader>
        <DemoContent />
      </InfoCard>
    );
  },
};

export const CollapsibleContent: Story = {
  render: () => {
    return (
      <InfoCard style={{ maxWidth: "30rem" }}>
        <InfoCardHeader>
          <InfoCardTitle>InfoCard Title</InfoCardTitle>
        </InfoCardHeader>
        <InfoCardCollapsibleContent>
          <button>Interactive content</button>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugiat
          tempore corrupti asperiores praesentium? Asperiores, doloribus?
          Molestias, laudantium saepe. Nihil in alias praesentium maxime iure
          ipsam? Accusantium libero quia quis!
          <button>Interactive content</button>
        </InfoCardCollapsibleContent>
        <InfoCardExpandButton />
      </InfoCard>
    );
  },
};

/* export const Chromatic: Story = {
  render: () => (
    <div>
      <h2>Default</h2>
      <Default />
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
}; */

function DemoContent() {
  return (
    <InfoCardContent>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure unde,
      repudiandae, deleniti exercitationem quod aut veniam sint officiis
      necessitatibus nulla nostrum voluptatem facilis! Commodi, nobis tempora
      quibusdam temporibus nulla quam
    </InfoCardContent>
  );
}
