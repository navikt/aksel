import type { Meta } from "@storybook/react-vite";
import React from "react";
import { HGrid } from "../../primitives/grid";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import { RadioCard } from "./RadioCard";
import { RadioCardGroup } from "./RadioCardGroup";

const meta: Meta<typeof RadioCardGroup> = {
  title: "ds-react/RadioCard",
  component: RadioCardGroup,
  subcomponents: { RadioCard },
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

export const Default = () => (
  <RadioCardGroup
    legend="Velg leveringsmåte"
    description="Du kan velge ett alternativ."
  >
    <RadioCard value="digital" description="Sendes til innboksen din.">
      Digital levering
    </RadioCard>
    <RadioCard value="post" description="Sendes til folkeregistrert adresse.">
      Post
    </RadioCard>
  </RadioCardGroup>
);

export const HorizontalLayout = () => (
  <RadioCardGroup
    legend="Velg leveringsmåte"
    description="Du kan velge ett alternativ."
    defaultValue="digital"
    size="small"
  >
    <HGrid columns={{ xs: 1, md: 3 }}>
      <RadioCard value="digital" description="Sendes til innboksen din.">
        Digital levering
      </RadioCard>
      <RadioCard value="post" description="Sendes til folkeregistrert adresse.">
        Post
      </RadioCard>
      <RadioCard value="seng" description="Blir servert på sengen.">
        Servert på sengen
      </RadioCard>
    </HGrid>
  </RadioCardGroup>
);

export const Small = () => (
  <RadioCardGroup legend="Velg leveringsmåte" size="small">
    <RadioCard value="digital" description="Sendes til innboksen din.">
      Digital levering
    </RadioCard>
    <RadioCard value="post" description="Sendes til folkeregistrert adresse.">
      Post
    </RadioCard>
  </RadioCardGroup>
);

export const ErrorProp = () => (
  <RadioCardGroup
    legend="Velg leveringsmåte"
    error="Du må velge en leveringsmåte."
    defaultValue="digital"
  >
    <RadioCard value="digital" description="Sendes til innboksen din.">
      Digital levering
    </RadioCard>
    <RadioCard value="post" description="Sendes til folkeregistrert adresse.">
      Post
    </RadioCard>
  </RadioCardGroup>
);

export const Readonly = () => (
  <RadioCardGroup legend="Valgt leveringsmåte" defaultValue="digital" readOnly>
    <RadioCard value="digital" description="Sendes til innboksen din.">
      Digital levering
    </RadioCard>
    <RadioCard value="post" description="Sendes til folkeregistrert adresse.">
      Post
    </RadioCard>
  </RadioCardGroup>
);

export const Disabled = () => (
  <RadioCardGroup legend="Velg leveringsmåte" defaultValue="digital" disabled>
    <RadioCard value="digital" description="Sendes til innboksen din.">
      Digital levering
    </RadioCard>
    <RadioCard value="post" description="Sendes til folkeregistrert adresse.">
      Post
    </RadioCard>
  </RadioCardGroup>
);

export const Chromatic = renderStoriesForChromatic({
  Default,
  HorizontalLayout,
  Small,
  ErrorProp,
  Readonly,
  Disabled,
});

export const ChromaticDark = renderStoriesForChromatic({
  Default,
  HorizontalLayout,
  Small,
  ErrorProp,
  Readonly,
  Disabled,
});
ChromaticDark.globals = { theme: "dark" };
