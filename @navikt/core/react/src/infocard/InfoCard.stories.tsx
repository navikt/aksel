import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  ChevronDownIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareIcon,
  LinkIcon,
  ThumbDownFillIcon,
  ThumbUpFillIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { Spacer, VStack } from "../layout/stack";
import { Link } from "../link";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";
import InfoCard, {
  InfoCardContent,
  InfoCardHeader,
  InfoCardIcon,
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
          <InfoCardIcon>
            <InformationSquareIcon />
          </InfoCardIcon>
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
          <InfoCardIcon>
            <InformationSquareIcon />
          </InfoCardIcon>
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
          <InfoCardIcon>
            <InformationSquareIcon />
          </InfoCardIcon>
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
            <InfoCardIcon>
              <InformationSquareIcon />
            </InfoCardIcon>
            <InfoCardTitle>Info: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="success">
          <InfoCardHeader>
            <InfoCardIcon>
              <ThumbUpFillIcon />
            </InfoCardIcon>
            <InfoCardTitle>Gjør dette: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="brand-magenta">
          <InfoCardHeader>
            <InfoCardIcon>
              <ThumbDownFillIcon />
            </InfoCardIcon>
            <InfoCardTitle>Unngå dette: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="warning">
          <InfoCardHeader>
            <InfoCardIcon>
              <ExclamationmarkTriangleFillIcon />
            </InfoCardIcon>
            <InfoCardTitle>Pass på: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
        <InfoCard data-color="neutral">
          <InfoCardHeader>
            <InfoCardIcon>
              <LinkIcon />
            </InfoCardIcon>
            <InfoCardTitle>Lenker: InfoCard title</InfoCardTitle>
          </InfoCardHeader>
          <DemoContent />
        </InfoCard>
      </VStack>
    );
  },
};

export const CustomHeaders: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <VStack gap="space-24">
        <InfoCard>
          <InfoCardHeader>
            <InfoCardIcon>
              <InformationSquareIcon />
            </InfoCardIcon>
            <InfoCardTitle>Info: InfoCard title</InfoCardTitle>
            <Spacer />
            <Button
              icon={<ChevronDownIcon aria-hidden />}
              data-color="neutral"
              variant="tertiary"
              size="small"
              style={{ rotate: open ? "180deg" : "0deg" }}
              onClick={() => setOpen((prev) => !prev)}
            />
          </InfoCardHeader>
          {open && <DemoContent />}
        </InfoCard>
        <InfoCard>
          <InfoCardHeader>
            <InfoCardIcon>
              <InformationSquareIcon />
            </InfoCardIcon>
            <Link href="#">
              <InfoCardTitle>Info: InfoCard title</InfoCardTitle>
            </Link>
          </InfoCardHeader>
          {open && <DemoContent />}
        </InfoCard>
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
      <InfoCard>
        <InfoCardHeader>
          <InfoCardIcon>
            <InformationSquareIcon />
          </InfoCardIcon>
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

export const Chromatic = renderStoriesForChromatic({
  Default,
  SizeSmall,
  OnlyHeader,
  Compositions,
  CustomHeaders,
  WrappingTitle,
});

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
