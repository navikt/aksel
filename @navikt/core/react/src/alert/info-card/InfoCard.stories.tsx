import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ChevronDownIcon, InformationSquareIcon } from "@navikt/aksel-icons";
import type { AkselColorRole } from "@navikt/ds-tokens/types";
import { Button } from "../../button";
import { Spacer, VStack } from "../../layout/stack";
import { Link } from "../../link";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import {
  InfoCard,
  InfoCardContent,
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
        <InfoCardHeader icon={<InformationSquareIcon />}>
          <InfoCardTitle>{props.title ?? "InfoCard title"}</InfoCardTitle>
        </InfoCardHeader>
        <InfoCardContent>
          {props.children ?? "InfoCard content"}
        </InfoCardContent>
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
        <InfoCardHeader icon={<InformationSquareIcon />}>
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
        <InfoCardHeader icon={<InformationSquareIcon />}>
          <InfoCardTitle>InfoCard Title</InfoCardTitle>
        </InfoCardHeader>
      </InfoCard>
    );
  },
};

const colors: AkselColorRole[] = [
  "info",
  "success",
  "warning",
  "danger",
  "brand-magenta",
  "brand-blue",
  "brand-beige",
  "neutral",
  "accent",
  "meta-purple",
  "meta-lime",
];

export const Compositions: Story = {
  render: () => {
    return (
      <VStack gap="space-16">
        {colors.map((color) => (
          <InfoCard data-color={color} key={color}>
            <InfoCardHeader icon={<InformationSquareIcon />}>
              <InfoCardTitle>Info: InfoCard title</InfoCardTitle>
            </InfoCardHeader>
            <DemoContent />
          </InfoCard>
        ))}
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
          <InfoCardHeader icon={<InformationSquareIcon />}>
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
          <InfoCardHeader icon={<InformationSquareIcon />}>
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
        <InfoCardHeader icon={<InformationSquareIcon />}>
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
      necessitatibus nulla nostrum voluptatem <Link href="#">Test</Link>
      facilis! Commodi, nobis tempora quibusdam temporibus nulla quam.{" "}
      <Button size="small">test</Button>
    </InfoCardContent>
  );
}
