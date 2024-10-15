import { StoryObj } from "@storybook/react";
import React from "react";
import { StarIcon as BaseStarIcon } from "@navikt/aksel-icons";
import { HStack, VStack } from "../layout/stack";
import { Button } from "./index";

export default {
  title: "ds-react/Button",
  component: Button,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof Button>;

const StarIcon = () => <BaseStarIcon aria-hidden />;

const variants: (
  | "primary"
  | "secondary"
  | "tertiary"
  | "primary-neutral"
  | "secondary-neutral"
  | "tertiary-neutral"
  | "danger"
)[] = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "primary-neutral",
  "secondary-neutral",
  "tertiary-neutral",
];

export const Controls: Story = {
  render: (props) => {
    return (
      <Button
        variant={props.variant}
        size={props.size}
        loading={props.loading}
        icon={props.icon ? <StarIcon /> : undefined}
        iconPosition={props.iconPosition}
      >
        {props.children}
      </Button>
    );
  },

  args: {
    icon: false,
    loading: false,
    iconPosition: "left",
    children: "Button",
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: {
        type: "radio",
      },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "danger",
        "primary-neutral",
        "secondary-neutral",
        "tertiary-neutral",
      ],
    },
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small", "xsmall"],
    },
    iconPosition: {
      control: {
        type: "radio",
      },
      options: ["left", "right"],
    },
  },
};

function ButtonGrid(props: any) {
  return (
    <VStack gap="2">
      {variants.map((variant) => (
        <HStack gap="2" key={variant}>
          <Button variant={variant} {...props}>
            Button
          </Button>
          <Button variant={variant} {...props} icon={<StarIcon />}>
            Button
          </Button>
          <Button
            variant={variant}
            {...props}
            icon={<StarIcon />}
            iconPosition="right"
          >
            Button
          </Button>
          <Button variant={variant} {...props} icon={<StarIcon />} />
        </HStack>
      ))}
    </VStack>
  );
}

export const Medium: Story = {
  render: () => <ButtonGrid size="medium" />,
};

export const Small: Story = {
  render: () => <ButtonGrid size="small" />,
};

export const XSmall: Story = {
  render: () => <ButtonGrid size="xsmall" />,
};

export const AsLink: Story = {
  render: () => (
    <VStack gap="4">
      <Button href="#" as="a">
        Button as a-tag
      </Button>
      <Button href="#" as="a" disabled>
        Disabled Button as a-tag
      </Button>
    </VStack>
  ),
};

export const Loading: Story = {
  render: () => <ButtonGrid loading />,
};

export const LoadingAsLink: Story = {
  render: () => <ButtonGrid loading href="#" as="a" />,
};

export const Disabled: Story = {
  render: () => <ButtonGrid disabled />,
};

export const DisabledAsLink: Story = {
  render: () => <ButtonGrid disabled href="#" as="a" />,
};

export const Chromatic: Story = {
  render: () => (
    <VStack gap="6" align="center">
      <div>
        <h2>Medium</h2>
        <ButtonGrid size="medium" />
      </div>
      <div>
        <h2>Small</h2>
        <ButtonGrid size="small" />
      </div>
      <div>
        <h2>XSmall</h2>
        <ButtonGrid size="xsmall" />
      </div>
      <div>
        <h2>As Link</h2>
        <ButtonGrid as="a" href="#" />
      </div>
      <div>
        <h2>Disabled</h2>
        <ButtonGrid disabled />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const ChromaticForcedColors: Story = {
  render: Chromatic.render,
  parameters: {
    chromatic: { disable: false, forcedColors: "active" },
  },
};

export const ChromaticDarksideDark: Story = {
  render: Chromatic.render,
  parameters: {
    chromatic: { disable: false },
  },
  globals: { theme: "dark", mode: "darkside" },
};

export const ChromaticDarksideLight: Story = {
  render: Chromatic.render,
  parameters: {
    chromatic: { disable: false },
  },
  globals: { theme: "light", mode: "darkside" },
};
