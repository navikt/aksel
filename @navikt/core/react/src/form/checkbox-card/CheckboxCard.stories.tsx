import type { Meta } from "@storybook/react-vite";
import React from "react";
import { HGrid } from "../../primitives/grid";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import { CheckboxCard } from "./CheckboxCard";
import { CheckboxCardGroup } from "./CheckboxCardGroup";

const meta: Meta<typeof CheckboxCardGroup> = {
  title: "ds-react/CheckboxCard",
  component: CheckboxCardGroup,
  subcomponents: { CheckboxCard },
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

export const Default = () => (
  <CheckboxCardGroup
    legend="Velg varslingskanaler"
    description="Du kan velge flere alternativer."
  >
    <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
      SMS
    </CheckboxCard>
    <CheckboxCard value="epost" description="Sendes til e-postadressen din.">
      E-post
    </CheckboxCard>
  </CheckboxCardGroup>
);

export const HorizontalLayout = () => (
  <CheckboxCardGroup
    legend="Velg varslingskanaler"
    description="Du kan velge flere alternativer."
    defaultValue={["sms"]}
    size="small"
  >
    <HGrid columns={{ xs: 1, md: 3 }}>
      <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
        SMS
      </CheckboxCard>
      <CheckboxCard value="epost" description="Sendes til e-postadressen din.">
        E-post
      </CheckboxCard>
      <CheckboxCard
        value="brev"
        description="Sendes til folkeregistrert adresse."
      >
        Brev
      </CheckboxCard>
    </HGrid>
  </CheckboxCardGroup>
);

export const Small = () => (
  <CheckboxCardGroup legend="Velg varslingskanaler" size="small">
    <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
      SMS
    </CheckboxCard>
    <CheckboxCard value="epost" description="Sendes til e-postadressen din.">
      E-post
    </CheckboxCard>
  </CheckboxCardGroup>
);

export const ErrorProp = () => (
  <CheckboxCardGroup
    legend="Velg varslingskanaler"
    error="Du må velge minst én varslingskanal."
    defaultValue={["sms"]}
  >
    <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
      SMS
    </CheckboxCard>
    <CheckboxCard value="epost" description="Sendes til e-postadressen din.">
      E-post
    </CheckboxCard>
  </CheckboxCardGroup>
);

export const Readonly = () => (
  <CheckboxCardGroup
    legend="Valgte varslingskanaler"
    defaultValue={["sms"]}
    readOnly
  >
    <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
      SMS
    </CheckboxCard>
    <CheckboxCard value="epost" description="Sendes til e-postadressen din.">
      E-post
    </CheckboxCard>
  </CheckboxCardGroup>
);

export const Disabled = () => (
  <CheckboxCardGroup
    legend="Velg varslingskanaler"
    defaultValue={["sms"]}
    disabled
  >
    <CheckboxCard value="sms" description="Sendes til mobilnummeret ditt.">
      SMS
    </CheckboxCard>
    <CheckboxCard value="epost" description="Sendes til e-postadressen din.">
      E-post
    </CheckboxCard>
  </CheckboxCardGroup>
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
