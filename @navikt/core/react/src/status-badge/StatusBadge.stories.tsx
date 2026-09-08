import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InboxIcon } from "@navikt/aksel-icons";
import { StatusBadge } from ".";
import { Button } from "../button";
import { HStack } from "../primitives/stack";
import type { AkselColor } from "../types/theme";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";

const meta: Meta<typeof StatusBadge> = {
  title: "ds-react/StatusBadge",
  component: StatusBadge,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

const statuses: { color: AkselColor; label: string }[] = [
  { color: "danger", label: "Avslått" },
  { color: "success", label: "Innvilget" },
  { color: "info", label: "Under behandling" },
  { color: "warning", label: "Mangler dokumentasjon" },
  { color: "neutral", label: "Ikke startet" },
];

const placements = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export const Default: Story = {
  args: {
    count: 42,
    "data-color": "danger",
  },
};

export const Dot: Story = {
  render: () => (
    <HStack gap="space-16" align="center">
      {statuses.map(({ color, label }) => (
        <StatusBadge key={color} data-color={color} aria-label={label} />
      ))}
    </HStack>
  ),
};

export const Count: Story = {
  render: () => (
    <HStack gap="space-16" align="center">
      <StatusBadge data-color="danger" count={1} />
      <StatusBadge data-color="danger" count={42} />
      <StatusBadge data-color="danger" count={42} maxCount={42} />
      <StatusBadge data-color="accent" count={199} />
    </HStack>
  ),
};

export const Anchored: Story = {
  render: () => (
    <HStack gap="space-32" align="center">
      <StatusBadge.Anchor placement="top-right">
        <Button
          icon={<InboxIcon aria-hidden />}
          aria-label="Innboks, 42 nye meldinger"
        />
        {/* Count is already part of the button's accessible name. */}
        <StatusBadge data-color="danger" aria-hidden count={42} />
      </StatusBadge.Anchor>
      <StatusBadge.Anchor placement="top-right">
        <Button icon={<InboxIcon aria-hidden />} aria-label="Innboks" />
        <StatusBadge data-color="danger" aria-label="Nytt varsel" />
      </StatusBadge.Anchor>
    </HStack>
  ),
};

export const Placements: Story = {
  render: () => (
    <HStack gap="space-32" align="center">
      {placements.map((placement) => (
        <StatusBadge.Anchor key={placement} placement={placement}>
          <Button
            icon={<InboxIcon aria-hidden />}
            aria-label={`Innboks, 3 nye meldinger (${placement})`}
          />
          <StatusBadge data-color="danger" aria-hidden count={3} />
        </StatusBadge.Anchor>
      ))}
    </HStack>
  ),
};

export const DynamicCount: Story = {
  render: () => {
    const [count, setCount] = React.useState(2);

    return (
      <HStack gap="space-16" align="center">
        <StatusBadge.Anchor>
          <Button
            icon={<InboxIcon aria-hidden />}
            aria-label={`Innboks, ${count} nye meldinger`}
          />
          <StatusBadge data-color="danger" aria-hidden count={count} />
        </StatusBadge.Anchor>
        <Button
          size="small"
          variant="secondary"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Ny melding
        </Button>
        <span role="status" className="aksel-sr-only">
          {`${count} nye meldinger`}
        </span>
      </HStack>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  Count,
  Dot,
  Anchored,
  Placements,
});
