import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InboxIcon } from "@navikt/aksel-icons";
import { Badge } from ".";
import { Button } from "../button";
import { HStack } from "../primitives/stack";
import type { AkselColor } from "../types/theme";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";

const meta: Meta<typeof Badge> = {
  title: "ds-react/Badge",
  component: Badge,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const statuses: { color: AkselColor; label: string }[] = [
  { color: "danger", label: "Avslått" },
  { color: "success", label: "Innvilget" },
  { color: "info", label: "Under behandling" },
  { color: "warning", label: "Mangler dokumentasjon" },
  { color: "neutral", label: "Ikke startet" },
];

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
        <Badge key={color} data-color={color} aria-label={label} />
      ))}
    </HStack>
  ),
};

export const Count: Story = {
  render: () => (
    <HStack gap="space-16" align="center">
      <Badge data-color="danger" count={1} />
      <Badge data-color="danger" count={42} />
      <Badge data-color="danger" count={42} maxCount={42} />
      <Badge data-color="accent" count={199} />
    </HStack>
  ),
};

export const Anchored: Story = {
  render: () => (
    <HStack gap="space-32" align="center">
      <Badge data-color="danger" count={42}>
        <Button
          icon={<InboxIcon aria-hidden />}
          aria-label="Innboks, 42 nye meldinger"
        />
      </Badge>
      <Badge data-color="danger" aria-label="Nytt varsel">
        <Button icon={<InboxIcon aria-hidden />} aria-label="Innboks" />
      </Badge>
    </HStack>
  ),
};

export const DynamicCount: Story = {
  render: () => {
    const [count, setCount] = React.useState(2);

    return (
      <HStack gap="space-16" align="center">
        <Badge data-color="danger" count={count}>
          <Button
            icon={<InboxIcon aria-hidden />}
            aria-label={`Innboks, ${count} nye meldinger`}
          />
        </Badge>
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
});
