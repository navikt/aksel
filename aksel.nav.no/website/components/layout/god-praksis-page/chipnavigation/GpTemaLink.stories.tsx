import type { Meta, StoryObj } from "@storybook/react";
import { HStack } from "@navikt/ds-react";
import { AkselTheme } from "@/sb-util";
import { GpTemaLink } from "./GpTemaLink";

const meta = {
  title: "Layout/god-praksis/chips/TemaLink",
  component: GpTemaLink,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof GpTemaLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tema: Story = {
  args: {
    children: "Innholdstarbeid",
    href: "/gp/123",
  },
};

export const Group = {
  render: () => (
    <HStack gap="2">
      <GpTemaLink href="#">Universell utforming</GpTemaLink>
      <GpTemaLink href="#">Innholdsarbeid</GpTemaLink>
      <GpTemaLink href="#">Universell utforming</GpTemaLink>
      <GpTemaLink href="#">Innholdsarbeid</GpTemaLink>
    </HStack>
  ),
};
