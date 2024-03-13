import type { Meta, StoryObj } from "@storybook/react";
import { HStack } from "@navikt/ds-react";
import { AkselTheme } from "@/sb-util";
import { GpLinkChip } from "./GpLinkChip";

const meta = {
  title: "Layout/god-praksis/chips/LinkChip",
  component: GpLinkChip,
  tags: ["autodocs"],
  decorators: [AkselTheme],
} satisfies Meta<typeof GpLinkChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tema: Story = {
  args: {
    children: "Innholdstarbeid",
    href: "/gp/123",
    type: "tema",
  },
};

export const Innholdstype: Story = {
  args: {
    children: "How-to",
    href: "/gp/123",
    type: "innholdstype",
  },
};

export const Group = {
  render: () => (
    <HStack gap="2">
      <GpLinkChip type="tema" href="#">
        Universell utforming
      </GpLinkChip>
      <GpLinkChip type="tema" href="#">
        Innholdsarbeid
      </GpLinkChip>
      <GpLinkChip type="tema" href="#">
        Universell utforming
      </GpLinkChip>
      <GpLinkChip type="tema" href="#">
        Innholdsarbeid
      </GpLinkChip>
      <GpLinkChip type="innholdstype" href="#">
        How-to
      </GpLinkChip>
      <GpLinkChip type="innholdstype" href="#">
        How-to
      </GpLinkChip>
    </HStack>
  ),
};
